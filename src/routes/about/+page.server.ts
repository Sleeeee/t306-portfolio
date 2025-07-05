import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const technologies = await prisma.technologies.findMany({});

	if (technologies) {
		return { technologies };
	}

	error(404, 'Not found');
};
