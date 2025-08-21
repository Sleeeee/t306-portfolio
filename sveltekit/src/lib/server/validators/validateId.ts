import prisma from '$lib/prisma';
import type { Item, Table, Validation } from '$lib/types';

interface Props {
  id: string;
  table: Table;
}

export const validateId = async ({ id, table }: Props): Validation => {
  if (!id) { return { success: false, message: "The \"id\" field is missing" }; }

  const parsedField: number = Number(id);
  if (isNaN(parsedField) || parsedField < 0 || !Number.isInteger(parsedField)) { return { success: false, message: "The \"id\" field must be a positive integer" }; }

  const existingItem: Item = await prisma[table].findUnique({ where: { id: parsedField } });
  if (!existingItem) { return { success: false, message: `The "id" field must be a valid "${table}" identifier` }; }

  return { success: true, parsedField, existingItem};
};
