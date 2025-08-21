import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '$types';
import { clearSessionCookie } from '$lib/server/auth';

export const actions: Actions = {
  default: clearSessionCookie
};
