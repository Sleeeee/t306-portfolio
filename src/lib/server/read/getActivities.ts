import prisma from '$lib/prisma';
import { Activity } from '$lib/types';

export const getActivities = async (): Promise<Activity[]> => {
  const activities: Activity[] = await prisma.activities.findMany({
    include: { labels: true },
    orderBy: { id: "asc" }
  });
  return activities;
};
