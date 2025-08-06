import type { Validation } from '$lib/types';

interface Props {
  date: string;
}

export const validateDate = ({ date }: Props): Validation => {
  const parsedField: Date = new Date(date);
  if (isNaN(parsedField.getTime())) { return { success: false, message: "The \"date\" field must be a valid date" }; }
  return { success: true, parsedField };
};
