import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Activity, Label, Technology } from '$lib/types';
import { createActivity, createLabel, createTechnology, deleteActivity, deleteLabel, deleteTechnology, editActivity, editLabel, editTechnology, getActivities, getLabels, getTechnologies } from '$lib/server';

export const load: PageServerLoad = async () => {
  const activities: Activity[] = await getActivities();
  const labels: Label[] = await getLabels();
  const technologies: Technology[] = await getTechnologies();

  if (activities || labels || technologies) {
    return { activities, labels, technologies };
  }

  error(404, "Not found");
};

export const actions = {
  createActivity,
  createLabel,
  createTechnology,
  deleteActivity,
  deleteLabel,
  deleteTechnology,
  editActivity,
  editLabel,
  editTechnology
} satisfies Actions;
