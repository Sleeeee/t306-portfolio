import prisma from '$lib/prisma';
import { Technology } from '$lib/types';

export const getTechnologies = async (): Promise<Technology[]> => {
  const technologies: Technology[] = await prisma.technologies.findMany({
    include: { labels: true },
    orderBy: { id: "asc" }
  });
  return technologies;	
};
