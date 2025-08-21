import { redirect, type Handle } from '@sveltejs/kit';
import { validateSessionCookie } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies, url } = event;

  if (url.pathname.startsWith("/admin")) {
    const isAuthenticated: boolean = await validateSessionCookie({ cookies });
    if (!isAuthenticated) { redirect(302, "/login"); }
  }

  return await resolve(event);
};
