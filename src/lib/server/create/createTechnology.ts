import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { createItem, validateImage, validateInt, validateLabels } from '$lib/server';

export const createTechnology = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const raw: RawData = {
    name: { data: data.get("name") },
    labels: { data: data.getAll("labels"), validator: async (labels) => await validateLabels({ labels, action: "connect" }) },
    mastery: { data: data.get("mastery"), validator: (int) => validateInt({ int, field: "mastery", min: 0, max: 100 }) },
    description: { data: data.get("description") },
    image: { data: data.get("image"), validator: (image) => validateImage({ image, field: "image" }) }
  };

  return createItem({ raw, table: "technologies" });
};
