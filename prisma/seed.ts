import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Removing existing table content...');

	await prisma.labels.deleteMany({});
	await prisma.technologies.deleteMany({});
	await prisma.activities.deleteMany({});	

	console.log('Tables successfully cleaned. Re-populating tables...');

	const label1 = await prisma.labels.create({
		data: {
			name: 'Admin',
			color: 'indigo'
		}
	});
	const label2 = await prisma.labels.create({
		data: {
			name: 'Development',
			color: 'green'
		}
	});

	const technology1 = await prisma.technologies.create({
		data: {
			name: 'Svelte',
			mastery: 40,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat neque nec gravida tincidunt. Maecenas a lectus et dolor pulvinar viverra. Integer dapibus rhoncus nisi eu rutrum. Nullam lobortis lectus vel metus faucibus finibus vitae non mi. Nam et pretium tellus. Nam sodales erat a ante laoreet lacinia. Nam accumsan.',
			image: '/favicon.png'
		}
	});
	const technology2 = await prisma.technologies.create({
		data: {
			name: 'Linux',
			mastery: 75,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus et volutpat pellentesque. Suspendisse quis ligula sed ipsum faucibus varius at sit amet mauris. Phasellus ut odio non ipsum congue tincidunt eu posuere risus. Cras et libero odio. Aenean ut risus gravida libero semper congue. Cras vel risus lacinia, ultrices lorem sed, cursus ipsum. Integer porta dignissim sapien quis mattis. Cras condimentum risus id ante feugiat sollicitudin. Mauris lorem odio, molestie a lectus sit amet, rutrum suscipit quam. Mauris tellus felis, auctor quis gravida in, euismod quis mi. Mauris efficitur dapibus erat, non auctor purus hendrerit et. Nam efficitur et tellus quis dapibus. Morbi risus magna, mattis et pharetra sed, commodo eget sem. Sed tristique ornare mi in suscipit. Nam luctus, urna et dapibus interdum, leo urna mattis urna, sed convallis mi sem et erat. Vivamus vehicula, elit id aliquam tristique, neque lacus lobortis arcu, eu semper tortor ipsum.',
			image: '/favicon.png'
		}
	});
	const technology3 = await prisma.technologies.create({
		data: {
			name: 'Docker',
			mastery: 80,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat neque nec gravida tincidunt. Maecenas a lectus et dolor pulvinar viverra. Integer dapibus rhoncus nisi eu rutrum. Nullam lobortis lectus vel metus.',
			image: '/postgres_logo.png'
		}
	});
	const technology4 = await prisma.technologies.create({
		data: {
			name: 'PostgreSQL',
			mastery: 55,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus et volutpat pellentesque. Suspendisse quis ligula sed ipsum faucibus varius at sit amet mauris. Phasellus ut odio non ipsum congue tincidunt eu posuere risus. Cras et libero odio. Aenean ut risus gravida libero semper congue. Cras vel risus lacinia, ultrices lorem sed, cursus ipsum. Integer porta dignissim sapien quis mattis. Cras condimentum risus id ante feugiat sollicitudin. Mauris lorem odio, molestie a lectus sit amet, rutrum suscipit quam. Mauris tellus felis, auctor quis gravida in, euismod quis mi. Mauris efficitur dapibus erat, non auctor purus hendrerit et. Nam efficitur et tellus quis dapibus. Morbi risus magna, mattis et pharetra sed, commodo eget sem. Sed tristique ornare mi in suscipit. Nam luctus, urna et dapibus interdum, leo urna mattis urna, sed convallis mi sem.',
			image: '/postgres_logo.png'
		}
	});
	const technology5 = await prisma.technologies.create({
		data: {
			name: 'React',
			mastery: 60,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus et volutpat pellentesque. Suspendisse quis ligula sed ipsum faucibus varius at sit amet mauris. Phasellus ut odio non ipsum congue tincidunt eu posuere risus. Cras et libero odio. Aenean ut risus gravida libero semper congue. Cras vel risus lacinia, ultrices lorem sed, cursus ipsum. Integer porta dignissim sapien quis mattis. Cras condimentum risus id ante feugiat sollicitudin. Mauris lorem odio, molestie a lectus sit amet, rutrum suscipit quam. Mauris tellus felis, auctor quis gravida in, euismod quis mi. Mauris efficitur dapibus erat, non auctor purus hendrerit et. Nam efficitur et tellus quis dapibus. Morbi risus magna, mattis et pharetra sed, commodo eget sem. Sed tristique ornare mi in suscipit. Nam luctus, urna et dapibus interdum, leo urna mattis urna, sed convallis mi sem.',
			image: '/favicon.png'
		}
	});
  const technology6 = await prisma.technologies.create({
		data: {
			name: 'C',
			mastery: 40,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus et volutpat pellentesque.',
			image: '/favicon.png'
		}
	});
  const technology7 = await prisma.technologies.create({
		data: {
			name: 'Astal',
			mastery: 80,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim purus et volutpat pellentesque. Suspendisse quis ligula sed ipsum faucibus varius at sit amet mauris. Phasellus ut odio non ipsum congue tincidunt eu posuere risus. Cras et libero odio. Aenean ut risus gravida libero semper congue. Cras vel risus lacinia, ultrices lorem sed, cursus ipsum.',
			image: '/postgres_logo.png'
		}
	});

	const activity1 = await prisma.activities.create({
		data: {
			date: new Date('2025-02-17'),
			name: 'Build this portfolio',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis pharetra libero. Vivamus vel vehicula libero. Sed eget commodo justo. Duis euismod ullamcorper finibus. Cras nibh velit, venenatis et justo ut, volutpat fringilla est. Curabitur velit mi, eleifend ut dictum id, lobortis commodo elit. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pharetra lectus eget libero blandit lobortis. Nullam ut leo ut erat sodales posuere. Praesent bibendum.',
			image: '/csc.jpg',
      time_valued: 10,
      time_real: 30,
      proof: "/postgres_logo.png",
      labels: {
        connect: [{id: label1.id}, { id: label2.id }]
      }
		}
	});
	const activity2 = await prisma.activities.create({
		data: {
			date: new Date('2024-03-21'),
			name: 'Cyber Security Challenge Belgium 2024',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac euismod erat. Duis vel sapien viverra ipsum dapibus laoreet. Nam dapibus dictum nisi, non porttitor nulla posuere nec. Interdum et malesuada fames ac ante.',
			image: '/csc.jpg',
      time_valued: 5,
      time_real: 15,
      proof: "/csc.jpg",
      labels: {
        connect: [{id: label1.id}]
      }
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
