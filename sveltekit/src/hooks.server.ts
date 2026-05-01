import { error, redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { validateSessionCookie } from '$lib/server/auth';

const isTailscaleIp = (ip: string): boolean => {
  if (!ip.startsWith('100.')) return false;
  const secondByte = parseInt(ip.split('.')[1], 10);
  return secondByte >= 64 && secondByte <= 127;
};

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies, url, getClientAddress } = event;

  const isTailscaleClient = isTailscaleIp(getClientAddress());
  event.locals.isTailscaleClient = isTailscaleClient; // Declare for frontend access

  if (url.pathname.startsWith("/admin")) {
    if (!dev && !isTailscaleClient) {
      error(404, "Not found");
    }

    const isAuthenticated: boolean = await validateSessionCookie({ cookies });
    if (!isAuthenticated) { redirect(302, "/login"); }
  }

  return await resolve(event);
};
