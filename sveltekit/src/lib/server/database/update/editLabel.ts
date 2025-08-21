import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { editItem } from '$lib/server/database';
import { validateColor } from '$lib/server/validators';

export const editLabel = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const raw: RawData = {
    name: { data: data.get("name") },
    color: { data: data.get("color"), validator: (color) => validateColor({ color }) }
  };

  return editItem({ raw, table: "labels", id });
};
