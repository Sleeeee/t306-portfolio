import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { createItem, validateDate, validateImage, validateInt, validateLabels } from '$lib/server/validators';

export const createActivity = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const raw: RawData = {
    name: { data: data.get("name") },
    labels: { data: data.getAll("labels"), validator: async (labels) => await validateLabels({ labels, action: "connect" }) },
    date: { data: data.get("date"), validator: (date) => validateDate({ date }) },
    time_valued: { data: data.get("time_valued"), validator: (int) => validateInt({ int, field: "time_valued", min: 0 }) },
    time_real: { data: data.get("time_real"), validator: (int) => validateInt({ int, field: "time_real", min: 0 }) },
    description: { data: data.get("description") },
    image: { data: data.get("image"), validator: (image) => validateImage({ image, field: "image" }) },
    proof: { data: data.get("proof"), validator: (image) => validateImage({ image, field: "proof" }) }
  };

  return createItem({ raw, table: "activities" });
};
