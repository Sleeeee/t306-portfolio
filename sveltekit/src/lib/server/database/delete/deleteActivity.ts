import type { FormData } from '$types';
import type { ActionResponse } from '$lib/types';
import { deleteItem } from '$lib/server/database';

export const deleteActivity = async ({ cookies, request }): ActionResponse => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const imageFields: string[] = ["image", "proof"];

  return deleteItem({ table: "activities", id, imageFields });
};
