import { fail } from '@sveltejs/kit';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import prisma from '$lib/prisma';
import type { ActionResponse, Item, RawData, Table, Validation } from '$lib/types';
import { validateId } from '$lib/server/validators';

interface Props {
  raw: RawData;
  table: Table;
  id: string;
}

export const editItem = async ({ raw, table, id }: Props): Promise<ActionResponse> => {
  const validation: Validation = await validateId({ id, table });
  if (!validation.success) { return fail(422, validation); }
  id = validation.parsedField;
  const existingItem: Item = validation.existingItem;

  if (!Object.keys(raw).filter(key => raw[key].data !== null && (raw[key].data.length || raw[key].data.size)).length) {
    return fail(422, { success: false, message: "At least one field must be modified to edit this item" });
  }

  const parsed = {};
  const fileBuffers = {};

  for (let field in raw) {
    if (!raw[field].data) { continue; }

    if (raw[field].validator) {
      const validation: Validation = await raw[field].validator(raw[field].data);
      if (!validation.success) { return fail(422, validation); }

      if (validation.buffer) {
        fileBuffers[field] = validation.buffer;
      } else if (validation.parsedField !== undefined) {
        parsed[field] = validation.parsedField;
      }

    } else { parsed[field] = raw[field].data }
  }

  // Overwrite the existing files and edit the entry
  if (Object.keys(fileBuffers).length) {
    for (let [field, { buffer, extension }] of Object.entries(fileBuffers)) {
      const existingFilePath: string = join("static", existingItem[field]);

      try {
        await unlink(existingFilePath);
      } catch (error) {
        console.error("Error while deleting files:", error);
      }

      // Always change the filename to force a browser refetch
      const fileName: string = `${table}-${field}-${randomUUID().slice(0, 8)}.${extension}`;
      const newUrlPath: string = join("uploads", fileName);
      const newFilePath: string = join("static", newUrlPath);
      await writeFile(newFilePath, buffer);
      parsed[field] = newUrlPath;
    }
  }

  await prisma[table].update({
    where: { id },
    data: parsed
  });

  return { success: true, message: "Item updated successfully" };
};
