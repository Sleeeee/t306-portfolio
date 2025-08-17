<script lang="ts">
	import type { PageProps } from './$types';
  import type { ButtonConfig, Degree, Job, Technology } from '$lib/types';
  import { ProfileCardOutline } from 'flowbite-svelte-icons';
	import { AboutSections, Hero } from '$lib';

	let { data }: PageProps = $props();

  const aboutData: Promise<[Degree[], Job[], Technology[]]> = $derived(Promise.all([data.degrees, data.jobs, data.technologies]));

  const button: ButtonConfig = { icon: ProfileCardOutline, href: "/favicon.png", text: "View full résumé" };
</script>

<Hero
  image="/favicon.png"
  title="About me"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis libero viverra, fermentum odio nec, sodales ipsum. Morbi."
  {button}
/>

{#await aboutData}
  Placeholder Skeleton
{:then [degrees, jobs, technologies]}
  <AboutSections {degrees} {jobs} {technologies} />
{:catch}
  <p class="text-red-800">Error fetching about data: {error}</p>
{/await}
