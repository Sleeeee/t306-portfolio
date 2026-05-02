import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { editItem } from '$lib/server/database';

export const editObjective = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const raw: RawData = {
    name: { data: data.get("name") },
    description: { data: data.get("description") }
  };

  return editItem({ raw, table: "objectives", id });
};
