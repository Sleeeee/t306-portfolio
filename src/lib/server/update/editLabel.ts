import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { editItem, validateColor } from '$lib/server';

export const editLabel = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const raw: RawData = {
    name: { data: data.get("name") },
    color: { data: data.get("color"), validator: (color) => validateColor({ color }) }
  };

  return editItem({ raw, table: "labels", id });
};
