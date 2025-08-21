import type { FormData } from '$types';
import type { ActionResponse } from '$lib/types';
import { deleteItem } from '$lib/server/database';

export const deleteTechnology = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const imageFields: string[] = ["image"];

  return deleteItem({ table: "technologies", id, imageFields });
};
