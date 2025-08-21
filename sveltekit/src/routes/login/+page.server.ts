import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '$types';
import type { ActionResponse } from '$lib/types';
import { loginRequest, loginValidation } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
  const response: ActionResponse = await loginRequest({ cookies });
  if (!response?.success) { return { response: response.data }; }

  return {
    response,
    options: cookies.get("options")
  };
};

export const actions = {
  default: loginValidation
} satisfies Actions;
