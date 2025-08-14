import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createActivity, createLabel, createTechnology, deleteActivity, deleteLabel, deleteTechnology, editActivity, editLabel, editTechnology, getActivities, getLabels, getTechnologies } from '$lib/server';

export const load: PageServerLoad = async () => {
  return {
    activities: getActivities().then(activities => {
      if (!activities) { error(404, "Not found"); }
      return activities;
    }),
    labels: getLabels().then(labels => {
      if (!labels) { error(404, "Not found"); }
      return labels;
    }),
    technologies: getTechnologies().then(technologies => {
      if (!technologies) { error(404, "Not found"); }
      return technologies;
    })
  };
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
