<script lang="ts">
  import type { Degree, TimelineItemConfig } from '$lib/types';
  import { Timeline, TimelineItem } from 'flowbite-svelte';
  import { GraduationCapSolid } from 'flowbite-svelte-icons';
  import { BaseTimeline } from '$lib';
  import { educationDescription } from '$lib/constants';

  interface Props {
    degrees: Degree[];
  }

  let { degrees }: Props = $props();

  const items: TimelineItemConfig[] = $derived(degrees.map(degree => ({
    title: `${degree.degree} @ ${degree.institution}`,
    date: `${degree.date_start.toLocaleString(undefined, { month: "short", year: "numeric" })} - ${degree.date_end?.toLocaleDateString(undefined, { month: "short", year: "numeric" }) || "Present"}`,
    icon: GraduationCapSolid,
    location: degree.location,
    description: degree.description
  })));
</script>

<div class="w-full md:w-1/2 m-4 mx-auto p-4 backdrop-blur-sm bg-white/5 rounded-lg">
  <h2 class="mb-2 font-bold text-2xl dark:text-white">Education</h2>
  <p class="text-justify dark:text-white">{educationDescription}</p>
</div>

<BaseTimeline {items} />
