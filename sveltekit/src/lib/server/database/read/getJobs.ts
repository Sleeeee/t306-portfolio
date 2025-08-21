import prisma from '$lib/prisma';
import type { Job } from '$lib/types';

export const getJobs = async (): Promise<Job[]> => {
  const jobs: Jobs[] = await prisma.jobs.findMany({
    orderBy: { date_start: "asc" }
  });
  return jobs;
};
