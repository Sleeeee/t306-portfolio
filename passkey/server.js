import http from 'http';
import fs from 'fs';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';
import { PrismaClient } from '@prisma/client';

const host = "0.0.0.0";
const port = 8080;

const rpName = process.env.RP_NAME || "Localhost";
const rpId = process.env.RP_ID || "localhost";
const origin = process.env.ORIGIN || "http://localhost:8080";

const prisma = new PrismaClient();

let shutdown = () => { console.log("Shutdown function not initialized yet"); }

const currentOptions = { user: null, options: null };
function getCurrentOptions() { return currentOptions; }
function setCurrentOptions(user = null, options = null) {
  currentOptions.user = user;
  currentOptions.options = options;
}

function serve200(res, content, contentType) {
  res.writeHead(200, { "Content-Type": contentType });
  res.end(content);
}

function serve404(res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

function serve405(res) {
  res.writeHead(405, { "Content-Type": "text/plain" });
  res.end("Method Not Allowed");
}

function serve500(res) {
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Internal Server Error");
}

function serveIndex(res) {
  fs.readFile("index.html", (err, content) => {
    (err) ? serve500(res) : serve200(res, content, "text/html");
  });
}

async function getAdminUser() {
 return await prisma.users.findUnique({ where: { username: "admin" }});
}

async function createAdminUser() {
  const admin = await getAdminUser();
  if (admin) { return "User named \"admin\" already exists"; }
  await prisma.users.create({ data: { username: "admin" }});
  return "User \"admin\" created successfully";
}

async function getAdminPasskeys() {
  const admin = await getAdminUser();
  if (!admin) { return { content: "User named \"admin\" does not exist", contentType: "text/plain" };}
  const adminPasskeys = await prisma.passkeys.findMany({ where: { user: admin }});
  return adminPasskeys.map(passkey => ({
    id: passkey.cred_id,
    transports: passkey.transports
  }));
}

async function createAdminPasskey(registrationInfo) {
  const { credential, credentialDeviceType, credentialBackedUp } = registrationInfo;
  const admin = await getAdminUser();

  const data = {
    user: { connect: { id: admin.id }},
    cred_id: credential.id,
    cred_public_key: credential.publicKey,
    counter: credential.counter,
    transports: credential.transports,
    backup_eligible: true,
    backup_status: credentialBackedUp
  };
  await prisma.passkeys.create({ data });
  console.log("Passkey successfully stored in the database");
}

async function registerRequest() {
  const admin = await getAdminUser();
  if (!admin) { return { content: "User named \"admin\" does not exist", contentType: "text/plain" };}
  const adminPasskeys = await getAdminPasskeys();

  const options = await generateRegistrationOptions({
    rpName,
    rpId,
    userName: admin.username,
    attestationType: "none",
    excludeCredentials: adminPasskeys,
    authenticatorSelection: {
      residentKey: "discouraged",
      userVerification: "required",
      authenticatorAttachment: "cross-platform",
      preferredAuthenticatorType: "securityKey"
    }
  });

  setCurrentOptions(admin, options);
  return { content: JSON.stringify(options), contentType: "application/json" };
}

async function registerVerify(body) {
  const admin = await getAdminUser();
  if (!admin) { return { content: "User named \"admin\" does not exist", contentType: "text/plain" };}
  const { user, options } = getCurrentOptions();

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: options.challenge,
      expectedOrigin: origin,
      expectedRPID: rpId
    });
  } catch (error) {
    console.error(error);
    return { error };
  }
  return verification;
}

async function deleteAdminPasskey(credId) {
  try {
    await prisma.passkeys.delete({ where: { cred_id: credId }});
    return "Passkey deleted successfully";
  } catch {
    return "Could not find passkey to delete";
  }
}

async function handleRequest(req, res) {
  if (req.method === "GET") {
    if (req.url === "/") {
      serveIndex(res);
    } else if (req.url === "/passkeys") {
      const adminPasskeys = await getAdminPasskeys();
      serve200(res, JSON.stringify(adminPasskeys), "application/json");
    } else {
      serve404(res);
    }

  } else if (req.method === "POST") {
    if (req.url === "/register-request") {
      const { content, contentType } = await registerRequest();
      serve200(res, content, contentType);

    } else if (req.url === "/register-verify") {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });
      req.on("end", async () => {
        const parsedBody = JSON.parse(body);
        const verification = await registerVerify(parsedBody);
        serve200(res, JSON.stringify(verification), "application/json");
        if (verification.verified) { createAdminPasskey(verification.registrationInfo); }
      });

    } else if (req.url === "/register-admin") {
      const content = await createAdminUser();
      serve200(res, content, "text/plain");

    } else if (req.url === "/shutdown") {
      shutdown();

    } else {
      serve404(res);
    }

  } else if (req.method === "DELETE") {
    if (req.url === "/passkeys") {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });
      req.on("end", async () => {
        const content = await deleteAdminPasskey(body);
        serve200(res, content, "text/plain");
      });
    } else {
      serve404(res);
    }

  } else {
    serve405(res);
  }
}

const server = http.createServer(handleRequest);
server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});

shutdown = () => {
  console.log("Shutting down server...");

  prisma.$disconnect()
    .then(() => {
      console.log("Prisma client disconnected.");
      server.close(() => {
        console.log("Server stopped.");
        process.exit(0);
      });
    })
    .catch((err) => {
      console.error("Error disconnecting Prisma client:", err);
      process.exit(1);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
