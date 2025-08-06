import { fail } from '@sveltejs/kit';
import { unlink } from 'fs/promises';
import { join } from 'path';
import prisma from '$lib/prisma';
import type { ActionResponse, Item, Table, Validation } from '$lib/types';
import { validImageFields, validTables } from '$lib/constants';
import { validateId } from '$lib/server';

interface Props {
  table: Table;
  id: string;
  imageFields: string[];
}

export const deleteItem = async ({ table, id, imageFields = [] }: Props): Promise<ActionResponse> => {
  if (!imageFields.every(field => validImageFields.includes(field))) { return fail(422, { success: false, message: "The \"imageFields\" argument must be a valid image field" }); }
  if (!validTables.includes(table)) { return fail(422, { success: false, message: "The \"table\" argument must be a valid table name" }); }

  const validation: Validation = await validateId({ id, table });
  if (!validation.success) { return fail(422, validation); }
  id = validation.parsedField;
  const existingItem: Item = validation.existingItem;

  try {
    for (let field of imageFields) {
      const urlPath: string = existingItem[field];
      const filePath: string = join("static", urlPath);
      await unlink(filePath);
    }
  } catch (error) {
    console.error("Error while deleting files:", error);
  }

  await prisma[table].delete({ where: { id } });

  return { success: true, message: "Activity deleted successfully" };
};
