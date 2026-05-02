import prisma from '$lib/prisma';
import type { Objective } from '$lib/types';

export const getObjectives = async (): Promise<Objective[]> => {
  const objectives: Objective[] = await prisma.objectives.findMany({
    orderBy: { id: "asc" }
  });
  return objectives;
}
