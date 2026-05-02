<script lang="ts">
  import type { PageProps } from './$types';
  import type { ButtonConfig, Degree, Job, Objective, Technology } from '$lib/types';
  import { ProfileCardOutline } from 'flowbite-svelte-icons';
  import { AboutSections, Hero, SectionSkeleton } from '$lib';
  import { aboutDescription } from '$lib/constants';

  let { data }: PageProps = $props();

  const aboutData: Promise<[Degree[], Job[], Objective[], Technology[]]> = $derived(Promise.all([data.degrees, data.jobs, data.objectives, data.technologies]));

  const button: ButtonConfig = { icon: ProfileCardOutline, href: "/favicon.png", target: "_blank", text: "View full résumé" };
</script>

<Hero
  imageLight="/avatar_about_light.png"
  imageDark="/avatar_about_dark.png"
  title="About me"
  description={aboutDescription}
  {button}
/>

{#await aboutData}
  <SectionSkeleton />
{:then [degrees, jobs, objectives, technologies]}
  <AboutSections {degrees} {jobs} {objectives} {technologies} />
{:catch error}
  <p class="text-red-800">Error fetching about data: {error}</p>
{/await}
