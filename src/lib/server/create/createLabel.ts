import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { createItem, validateColor } from '$lib/server';

export const createLabel = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const raw: RawData = {
    name: { data: data.get("name") },
    color: { data: data.get("color"), validator: (color) => validateColor({ color }) }
  };

  return createItem({ raw, table: "labels" });
};
