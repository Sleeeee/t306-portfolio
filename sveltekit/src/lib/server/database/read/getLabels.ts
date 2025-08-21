import prisma from '$lib/prisma';
import type { Label } from '$lib/types';

export const getLabels = async (): Promise<Label[]> => {
  const labels: Label[] = await prisma.labels.findMany({
    orderBy: { id: "asc" }
  });
  return labels;
};
