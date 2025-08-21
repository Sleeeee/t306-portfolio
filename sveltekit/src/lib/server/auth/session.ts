import type { Session, SessionWithToken } from '$lib/types';
import { validSessionMilliseconds } from '$lib/constants';
import prisma from '$lib/prisma';
import { generateSecret, hashSecret, verifySecret } from '$lib/server/auth';

export const createSession = async ({ cookies }): Promise<SessionWithToken> => {
  const id: string = generateSecret();
  const secret: string = generateSecret();
  const secret_hash: Uint8Array = await hashSecret(secret);
  const token: string = id + "." + secret;

  const session: SessionWithToken = { id, secret_hash, token };
  await prisma.sessions.create({ data: {
    id: session.id,
    secret_hash: session.secret_hash
  }});

  cookies.set("session", token, { path: "/", maxAge: 1800 });
  return session;
}

export const deleteAllSessions = async (): Promise<void> => {
  await prisma.sessions.deleteMany({});
};

const deleteSession = async (id: string): Promise<void> => {
  await prisma.sessions.delete({ where: { id }});
};

const validateSession = async (token: string): Promise<Session | null> => {
  const parts: string[] = token.split(".");
  if (parts.length !== 2) { return null; }
  const [id, secret] = parts;

  const session: Session = await prisma.sessions.findUnique({ where: { id }});
  if (!session) { return null; }

  const now: Date = new Date();
  if (now.getTime() - session.created_at.getTime() > validSessionMilliseconds) {
    await deleteSession(session.id);
    return null;
  }

  const tokenSecretHash: Uint8Array = await hashSecret(secret);
  if (!verifySecret(tokenSecretHash, session.secret_hash)) { return null; }

  return session;
};

export const validateSessionCookie = async ({ cookies }): Promise<boolean> => {
  const token: string | undefined = cookies.get("session");
  if (!token) { return false; }
  const session: Session = await validateSession(token);
  if (!session) { return false; }
  return true;
};

export const clearSessionCookie = async ({ cookies }): Promise<boolean> => {
  if (!cookies.get("session")) { return false; }
  cookies.delete("session", { path: "/" });
  await deleteAllSessions();
  return true;
};
