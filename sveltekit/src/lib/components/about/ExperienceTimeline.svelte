<script lang="ts">
  import type { Job, TimelineItemConfig } from '$lib/types';
  import { Timeline, TimelineItem } from 'flowbite-svelte';
  import { BriefcaseSolid } from 'flowbite-svelte-icons';
  import { BaseTimeline } from '$lib';

  interface Props {
    jobs: Job[];
  }

  let { jobs }: Props = $props();

  const items: TimelineItemConfig[] = $derived(jobs.map(job => ({
    title: `${job.position} @ ${job.company}`,
    date: `${job.date_start.toLocaleString(undefined, { month: "short", year: "numeric" })} - ${job.date_end?.toLocaleDateString(undefined, { month: "short", year: "numeric" }) || "Present"}`,
    icon: BriefcaseSolid,
    location: job.location,
    description: job.description
  })));
</script>

<div class="w-full md:w-1/2 m-4 mx-auto p-4 backdrop-blur-sm bg-white/5 rounded-lg">
  <h2 class="mb-2 font-bold text-2xl dark:text-white">Experience</h2>
  <p class="text-justify dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at purus vitae neque elementum cursus. Nullam sed semper velit. Phasellus.</p>
</div>

<BaseTimeline {items} />
