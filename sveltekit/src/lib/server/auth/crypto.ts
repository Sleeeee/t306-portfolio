import crypto from 'crypto';
import { env } from '$env/dynamic/private';

export const generateSecret = (): string => {
  const alphabet: string = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes: Uint8Array = new Uint8Array(24);
  crypto.getRandomValues(bytes);

  let id: string = "";
  for (let i = 0; i < bytes.length; i++) {
    id += alphabet[bytes[i] >> 3];
  }
  return id;
}

export const hashSecret = async (secret: string): Promise<Uint8Array> => {
  const secretBytes: Uint8Array = new TextEncoder().encode(secret);
  const secretHashBuffer: ArrayBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
};

export const verifySecret = (a: Uint8Array, b: Uint8Array): boolean => {
  return crypto.timingSafeEqual(a, b);
};

export const signData = (data: string): string => {
  const hmac = crypto.createHmac("SHA-256", env.SECRET_KEY).update(data).digest("hex");
  // B64-encode to avoid cookie to contain domain dots
  return `${Buffer.from(data).toString("base64url")}.${Buffer.from(hmac).toString("base64url")}`;
};

export const verifySignature = (signedDataB64: string): string | false => {
  const parts: string[] = signedDataB64.split(".");
  if (parts.length !== 2) { return false; }
  const [dataB64, signatureB64] = parts;

  try {
    const data = Buffer.from(dataB64, "base64url").toString("utf-8");
    const signature = Buffer.from(signatureB64, "base64url").toString("utf-8");

    const expectedSignature: string = crypto.createHmac("SHA-256", env.SECRET_KEY).update(data).digest("hex");
    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) { return data; }

    return false;
  } catch (error) {
    return false;
  }
};
