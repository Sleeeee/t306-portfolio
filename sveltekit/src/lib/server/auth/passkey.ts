import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { FormData, PageServerLoad } from '$types';
import type { ActionResponse, Passkey, User } from '$lib/types';
import { generateAuthenticationOptions, verifyAuthenticationResponse, type PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/server';
import prisma from '$lib/prisma';
import { signData, verifySignature } from './crypto.ts';
import { createSession, deleteAllSessions } from './session.ts';

const rpID = env.RP_ID || "localhost";
const origin = env.ORIGIN || "http://localhost:5173";

const loginRequest = async ({ cookies }): Promise<ActionResponse> => {
  if (cookies.get("session")) { return fail(422, { success: false, message: "You are already authenticated" }); }
  if (cookies.get("options")) { return { success: true, message: "Challenge successfully retrieved from user cookie" }; }

  // Cleanup loose sessions
  await deleteAllSessions();

  const admin: User = await prisma.users.findUnique({ where: { username: "admin" }});
  if (!admin) { return fail(422, { success: false, message: "The \"admin\" user does not exist" }); }

  const adminPasskeys: Passkey[] = await prisma.passkeys.findMany({ where: { user: admin }});
  if (!adminPasskeys.length) { return fail(422, { success: false, message: "There are no passkeys stored in the database" }); }

  const options: PublicKeyCredentialRequestOptionsJSON = await generateAuthenticationOptions({
    rpID,
    allowCredentials: adminPasskeys.map(passkey => ({
      id: passkey.cred_id,
      transports: passkey.transports
    })),
    timeout: 60000,
    userVerification: "required"
  });

  const optionsSigned: string = signData(JSON.stringify(options));
  cookies.set("options", optionsSigned, { path: "/login", maxAge: 60 });
  return { success: true, message: "Challenge generated successfully" };
};

export const loginPageServerLoad: PageServerLoad = async({ cookies }) => {
  const response: ActionResponse = await loginRequest({ cookies });
  if (!response?.success) { return { response: response.data, options: null }; }

  const optionsB64: string | null = cookies.get("options");
  let options = null;

  if (optionsB64) {
    const optionsVerified: string | false = verifySignature(optionsB64);
    if (optionsVerified) { options = JSON.parse(optionsVerified); }
  }

  return {
    response,
    options
  };
};

export const loginValidation = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const signedOptions: string = cookies.get("options");
  if (!signedOptions) { return fail(422, { success: false, message: "Authentication options could not be fetched from the user cookie" }); }

  const options: string | false = verifySignature(signedOptions);
  if (!options) { return fail(422, { success: false, message: "Authentication options are invalid" }); }
  const optionsJSON: PublicKeyCredentialRequestOptionsJSON = JSON.parse(options);

  const response = JSON.parse(data.get("response"));
  const usedPasskey: Passkey = await prisma.passkeys.findUnique({ where: { cred_id: response.id }});

  try {
    const validation = await verifyAuthenticationResponse({
      response,
      expectedChallenge: optionsJSON.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: usedPasskey.id,
        publicKey: usedPasskey.cred_public_key,
        counter: usedPasskey.counter,
        transports: usedPasskey.transports
      }
    });
    if (validation?.verified) {
      cookies.delete("options", { path: "/login" });
      await createSession({ cookies });
      return { success: true, message: "Authentication successful" };
    }

  } catch (error) {
    console.error(error);
  }

  return fail(422, { success: false, message: "Authentication could not be completed" });
};
