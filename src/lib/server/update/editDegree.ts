import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { editItem, validateDate } from '$lib/server';

export const editDegree = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const raw: RawData = {
    degree: { data: data.get("degree") },
    institution: { data: data.get("institution") },
    location: { data: data.get("location") },
    date_start: { data: data.get("date_start"), validator: (date) => validateDate({ date }) },
    date_end: { data: data.get("date_end"), validator: (date) => validateDate({ date }) },
    description: { data: data.get("description") }
  };

  return editItem({ raw, table: "degrees", id });
};
