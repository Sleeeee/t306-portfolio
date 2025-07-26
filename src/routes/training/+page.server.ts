import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActivities } from '$lib/server/getActivities.ts';

type ImageActivity = {
  src: string;
  alt: string;
};

export const load: PageServerLoad = async () => {
  const activities = await getActivities();

  if (activities) {
    const imageActivities: ImageActivity[] = activities.map((a) => ({
      src: a.image,
      alt: a.name,
    }));

    return {
      activities,
      imageActivities
    };
  }

	error(404, 'Not found');
};
