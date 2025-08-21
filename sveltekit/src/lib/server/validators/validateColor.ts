import type { Color, Validation } from '$lib/types';
import { validColors } from '$lib/constants';

interface Props {
  color: string;
}

export const validateColor = ({ color }: Props): Validation => {
  if (!validColors.includes(color)) { return { success: false, message: "The \"color\" field must be a valid color" }; }

  return { success: true, parsedField: color };
};
