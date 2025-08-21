import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { createItem } from '$lib/server/database';
import { validateColor } from '$lib/server/validators';

export const createLabel = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const raw: RawData = {
    name: { data: data.get("name") },
    color: { data: data.get("color"), validator: (color) => validateColor({ color }) }
  };

  return createItem({ raw, table: "labels" });
};
