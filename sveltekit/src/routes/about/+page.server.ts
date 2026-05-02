import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { getDegrees, getJobs, getObjectives, getTechnologies } from '$lib/server/database';

export const load: PageServerLoad = async () => {
  return {
    degrees: getDegrees().then(degrees => {
      if (!degrees) { error(404, "Not found"); }
      return degrees;
    }),
    jobs: getJobs().then(jobs => {
      if (!jobs) { error(404, "Not found"); }
      return jobs;
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
