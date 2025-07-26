import prisma from '$lib/prisma';

type RawActivity = {
  id: number;
  name: string;
  date: Date;
  description: string;
  image: string;
  time_valued: number;
  time_real: number;
  proof: string;
};

export const getActivities = async () => {
  const rawActivities: RawActivity[] = await prisma.activities.findMany({
    include: {
      labels: {
        include: {
          label: true
        }
      }
    }
  });

	if (rawActivities) {
    const labelledActivities = rawActivities.map((a) => ({
      ...a,
      labels: a.labels.map((l) => l.label)
    }));

		return labelledActivities;
  }
};
