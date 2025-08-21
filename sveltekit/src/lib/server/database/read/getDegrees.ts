import prisma from '$lib/prisma';
import type { Degree } from '$lib/types';

export const getDegrees = async (): Promise<Degree[]> => {
  const degrees: Degree[] = await prisma.degrees.findMany({
    orderBy: { date_start: "asc" }
  });
  return degrees;
};
