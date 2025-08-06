import prisma from '$lib/prisma';
import type { ForeignKeyAction, ForeignKeyConfig, Label, Validation } from '$lib/types';
import { validForeignKeyActions } from '$lib/constants';

interface Props {
  labels: string[];
  action: ForeignKeyAction;
}

export const validateLabels = async ({ labels, action }: Props): Promise<Validation> => {
  if (!labels.length) { return { success: true }; }

  if (!validForeignKeyActions.includes(action)) { return { success: false, message: "The \"labels\" action must be one of \"connect\", \"set\"" }; }

  const labelIds: number[] = labels.map(id => Number(id)).filter(id => !isNaN(id));
  if (labelIds.length !== labels.length) { return { success: false, message: "The \"labels\" field must contain only integers" }; }

  // Ensure labels are existing database ids
  if (labelIds.length) {
    const existingLabels: Label[] = await prisma.labels.findMany({ where: { id: { in: labelIds } } });
    if (existingLabels.length !== labelIds.length) { return { success: false, message: "The \"labels\" field must contain only valid label identifiers" }; }
  }

  const parsedField: ForeignKeyConfig = { [action]: labelIds.map(id => ({ id })) };
  return { success: true, parsedField };
};
