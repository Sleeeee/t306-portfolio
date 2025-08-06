import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Activity } from '$lib/types';
import { getActivities } from '$lib/server';

export const load: PageServerLoad = async () => {
  const activities: Activity[] = await getActivities();

  if (activities) {
    return { activities };
  }

	error(404, "Not found");
};
