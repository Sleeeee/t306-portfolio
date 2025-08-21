import type { Validation } from '$lib/types';

interface Props {
  int: string;
  field: string;
  min: number;
  max: number;
}

export const validateInt = ({ int, field, min, max }: Props): Validation => {
  const parsedField: number = Number(int);

  if (isNaN(parsedField) || !Number.isInteger(parsedField)) { return { success: false, message: `The "${field}" field must be a valid integer` }; }

  if (min && parsedField < min) { return { success: false, message: `The ${field} must not be lower than ${min}` }; }
  if (max && parsedField > max) { return { success: false, message: `The ${field} must not be greater than ${max}` }; }

  return { success: true, parsedField };
};
