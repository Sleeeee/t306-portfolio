import type { FormData } from '$types';
import type { ActionResponse } from '$lib/types';
import { deleteItem } from '$lib/server/database';

export const deleteDegree = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");

  return deleteItem({ table: "degrees", id });
};
