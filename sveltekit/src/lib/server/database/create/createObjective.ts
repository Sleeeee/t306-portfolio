import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { createItem } from '$lib/server/database';

export const createObjective = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const raw: RawData = {
    name: { data: data.get("name") },
    description: { data: data.get("description") }
  };

  return createItem({ raw, table: "objectives" });
};
