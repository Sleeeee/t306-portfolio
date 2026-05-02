import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '$types';
import { validateSessionCookie } from '$lib/server/auth';
import { createActivity, createDegree, createJob, createLabel, createObjective, createTechnology, deleteActivity, deleteDegree, deleteJob, deleteLabel, deleteObjective, deleteTechnology, editActivity, editDegree, editJob, editLabel, editObjective, editTechnology, getActivities, getDegrees, getJobs, getLabels, getObjectives, getTechnologies } from '$lib/server/database';

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
    objectives: getObjectives().then(objectives => {
      if (!objectives) { error(404, "Not found"); }
      return objectives;
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
  createObjective,
  createTechnology,
  deleteActivity,
  deleteDegree,
  deleteJob,
  deleteLabel,
  deleteObjective,
  deleteTechnology,
  editActivity,
  editDegree,
  editJob,
  editLabel,
  editObjective,
  editTechnology
} satisfies Actions;
