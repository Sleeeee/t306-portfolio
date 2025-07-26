import prisma from '$lib/prisma';

type Label = {
  id: number;
  name: string;
  color: string;
}

export const getLabels = async () => {
  const labels: Label[] = await prisma.labels.findMany({});
  return labels;
};
