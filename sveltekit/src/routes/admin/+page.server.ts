import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '$types';
import { validateSessionCookie } from '$lib/server/auth';
import { createActivity, createDegree, createJob, createLabel, createTechnology, deleteActivity, deleteDegree, deleteJob, deleteLabel, deleteTechnology, editActivity, editDegree, editJob, editLabel, editTechnology, getActivities, getDegrees, getJobs, getLabels, getTechnologies } from '$lib/server/database';

export const load: PageServerLoad = async ({ cookies }) => {
  return {
    activities: getActivities().then(activities => {
      if (!activities) { error(404, "Not found"); }
      return activities;
    }),
    degrees: getDegrees().then(degrees => {
      if (!degrees) { error(404, "Not found"); }
      return degrees;
    }),
    jobs: getJobs().then(jobs => {
      if (!jobs) { error(404, "Not found"); }
      return jobs;
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
  createDegree,
  createJob,
  createLabel,
  createTechnology,
  deleteActivity,
  deleteDegree,
  deleteJob,
  deleteLabel,
  deleteTechnology,
  editActivity,
  editDegree,
  editJob,
  editLabel,
  editTechnology
} satisfies Actions;
