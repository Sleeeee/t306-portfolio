import { fail } from '@sveltejs/kit';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import prisma from '$lib/prisma';
import type { ActionResponse, RawData, Table, Validation } from '$lib/types';
import { validTables } from '$lib/constants';

interface Props {
  raw: RawData;
  table: Table;
}

export const createItem = async ({ raw, table }: Props): Promise<ActionResponse> => {
  const parsed = {};
  const fileBuffers = {};

  if (!validTables.includes(table)) { return fail(422, { success: false, message: "The \"table\" argument must be a valid table name" }); }

  for (let field in raw) {
    if (!raw[field].data) { return fail(422, { success: false, message: `The ${field} field is missing` }); }

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

  // Create the files and the database entry atomically
  try {
    for (let [field, { buffer, extension }] of Object.entries(fileBuffers)) {
      const fileName: string = `${table}-${field}-${randomUUID().slice(0, 8)}.${extension}`;
      const urlPath: string = join("uploads", fileName);
      const filePath: string = join("static", urlPath);

      await writeFile(filePath, buffer);
      parsed[field] = urlPath;
    }

    await prisma[table].create({ data: parsed });
    return { success: true, message: "Item created successfully" };

  } catch (error) {
    console.error("Error while writing files:", error);
    console.log("Cleaning up loose files...");
    try {
      for (let path of [parsed["image"], parsed["proof"]]) {
        if (path) { await unlink(path) };
      }
      console.log("Loose files cleaned");
    } catch (cleanupError) {
      console.error("Failed to clean up file:", cleanupError);
    }

    return fail(500, { success: false, message: "Failed to create item" });
  }
};
