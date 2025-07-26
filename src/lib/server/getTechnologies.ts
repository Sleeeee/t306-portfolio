import prisma from '$lib/prisma';

type RawTechnology = {
  id: number;
  name: string;
  mastery: number;
  description: string;
  image: string;
}

export const getTechnologies = async () => {
  const rawTechnologies: RawTechnology[] = await prisma.technologies.findMany({
    include: {
      labels: {
        include: {
          label: true
        }
      }
    }
  });

	if (rawTechnologies) {
    const labelledTechnologies = rawTechnologies.map((t) => ({
      ...t,
      labels: t.labels.map((l) => l.label)
    }));
		return labelledTechnologies;
	}
};
