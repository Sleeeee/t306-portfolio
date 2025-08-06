import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { Technology } from '$lib/types';
import { getTechnologies } from '$lib/server';

export const load: PageServerLoad = async () => {
	const technologies: Technology[] = await getTechnologies();
	if (technologies) {
		return { technologies };
	}

	error(404, "Not found");
};
