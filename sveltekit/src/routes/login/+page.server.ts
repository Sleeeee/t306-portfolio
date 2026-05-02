import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '$types';
import { loginPageServerLoad, loginValidation } from '$lib/server/auth';

export const load: PageServerLoad = loginPageServerLoad;

export const actions = {
  default: loginValidation
} satisfies Actions;
