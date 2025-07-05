import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Running seed script...');

	const label1 = await prisma.labels.create({
		data: {
			name: 'Admin',
			color: '#fff5f2'
		}
	});
	const label2 = await prisma.labels.create({
		data: {
			name: 'Development',
			color: '#f0f9ff'
		}
	});

	const technology1 = await prisma.technologies.create({
		data: {
			name: 'Svelte',
			mastery: 40,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat neque nec gravida tincidunt. Maecenas a lectus et dolor pulvinar viverra. Integer dapibus rhoncus nisi eu rutrum. Nullam lobortis lectus vel metus faucibus finibus vitae non mi. Nam et pretium tellus. Nam sodales erat a ante laoreet lacinia. Nam accumsan.'
		}
	});
	const technology2 = await prisma.technologies.create({
		data: {
			name: 'Linux',
			mastery: 75,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus et volutpat pellentesque. Suspendisse quis ligula sed ipsum faucibus varius at sit amet mauris. Phasellus ut odio non ipsum congue tincidunt eu posuere risus. Cras et libero odio. Aenean ut risus gravida libero semper congue. Cras vel risus lacinia, ultrices lorem sed, cursus ipsum. Integer porta dignissim sapien quis mattis. Cras condimentum risus id ante feugiat sollicitudin. Mauris lorem odio, molestie a lectus sit amet, rutrum suscipit quam. Mauris tellus felis, auctor quis gravida in, euismod quis mi. Mauris efficitur dapibus erat, non auctor purus hendrerit et. Nam efficitur et tellus quis dapibus. Morbi risus magna, mattis et pharetra sed, commodo eget sem. Sed tristique ornare mi in suscipit. Nam luctus, urna et dapibus interdum, leo urna mattis urna, sed convallis mi sem et erat. Vivamus vehicula, elit id aliquam tristique, neque lacus lobortis arcu, eu semper tortor ipsum.'
		}
	});

	const activity1 = await prisma.activities.create({
		data: {
			created_at: new Date('2025-02-17'),
			name: 'Build this portfolio',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis pharetra libero. Vivamus vel vehicula libero. Sed eget commodo justo. Duis euismod ullamcorper finibus. Cras nibh velit, venenatis et justo ut, volutpat fringilla est. Curabitur velit mi, eleifend ut dictum id, lobortis commodo elit. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pharetra lectus eget libero blandit lobortis. Nullam ut leo ut erat sodales posuere. Praesent bibendum.'
		}
	});
	const activity2 = await prisma.activities.create({
		data: {
			created_at: new Date('2024-03-21'),
			name: 'Cyber Security Challenge Belgium 2024',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac euismod erat. Duis vel sapien viverra ipsum dapibus laoreet. Nam dapibus dictum nisi, non porttitor nulla posuere nec. Interdum et malesuada fames ac ante.'
		}
	});

	await prisma.technology_labels.create({
		data: {
			label_id: label1.id,
			technology_id: technology2.id
		}
	});
	await prisma.technology_labels.create({
		data: {
			label_id: label2.id,
			technology_id: technology1.id
		}
	});

	await prisma.activity_labels.create({
		data: {
			label_id: label1.id,
			activity_id: activity1.id
		}
	});
	await prisma.activity_labels.create({
		data: {
			label_id: label2.id,
			activity_id: activity1.id
		}
	});
	await prisma.activity_labels.create({
		data: {
			label_id: label1.id,
			activity_id: activity2.id
		}
	});

	console.log('Seeding completed successfully.');
}

main()
	.catch((e) => {
		console.error('Error during seed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
