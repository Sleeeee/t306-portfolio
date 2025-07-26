import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActivities } from '$lib/server/getActivities.ts';
import { getLabels } from '$lib/server/getLabels.ts';
import { getTechnologies } from '$lib/server/getTechnologies.ts';

export const load: PageServerLoad = async () => {
  const activities = await getActivities();
  const labels = await getLabels();
  const technologies = await getTechnologies();

  if (activities || labels || technologies) {
    return { activities, labels, technologies };
  }

  error(404, 'Not found');
};
