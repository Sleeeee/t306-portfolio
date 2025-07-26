import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { getTechnologies } from '$lib/server/getTechnologies.ts';

export const load: PageServerLoad = async () => {
	const technologies = await getTechnologies();
	if (technologies) {
		return { technologies };
	}

	error(404, 'Not found');
};
