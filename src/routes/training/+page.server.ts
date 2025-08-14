import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActivities } from '$lib/server';

export const load: PageServerLoad = async () => {
  return {
    activities: getActivities().then(activities => {
      if (!activities) { error(404, "Not found"); }
      return activities;
    })
  };
};
