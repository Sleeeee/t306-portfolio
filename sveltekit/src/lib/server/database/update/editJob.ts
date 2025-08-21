import type { FormData } from '$types';
import type { ActionResponse, RawData } from '$lib/types';
import { editItem } from '$lib/server/database';
import { validateDate } from '$lib/server/validators';

export const editJob = async ({ cookies, request }): Promise<ActionResponse> => {
  const data: FormData = await request.formData();

  const id: string = data.get("id");
  const raw: RawData = {
    position: { data: data.get("position") },
    company: { data: data.get("company") },
    location: { data: data.get("location") },
    date_start: { data: data.get("date_start"), validator: (date) => validateDate({ date }) },
    date_end: { data: data.get("date_end"), validator: (date) => validateDate({ date }) },
    description: { data: data.get("description") }
  };

  return editItem({ raw, table: "jobs", id });
};
