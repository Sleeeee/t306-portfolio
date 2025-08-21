import crypto from 'crypto';
import { SECRET_KEY } from '$env/static/private';

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
  const hmac = crypto.createHmac("SHA-256", SECRET_KEY).update(data).digest("hex");
  return `${data}.${hmac}`;
};

export const verifySignature = (signedData: string): boolean => {
  const parts: string[] = signedData.split(".");
  if (parts.length !== 2) { return false; }
  const [data, signature] = parts;

  const expectedSignature: string = crypto.createHmac("SHA-256", SECRET_KEY).update(data).digest("hex");
  if (signature === expectedSignature) { return data; }

  return false;
};
