import type { FormData } from '$types';
import type { ActionResponse } from '$lib/types';
import { deleteItem } from '$lib/server';

export const deleteLabel = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");

  return deleteItem({ table: "labels", id });
};
