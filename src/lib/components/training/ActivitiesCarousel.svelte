<script lang="ts">
  import type { Activity, ImageProps } from '$lib/types';
	import { Badge, Carousel, Controls, Indicators } from 'flowbite-svelte';

  interface Props {
    activities: Activity[];
  }

  let { activities }: Props = $props();

  const blankActivities: Activity[] = [{ name: "No items found", labels: [], date: new Date(), time_valued: 0, time_real: 0, description: "There is nothing to be displayed for now. Please come back later !", image: "/favicon.png", proof: "/favicon.png" }];
  const displayedActivities: Activity[] = activities?.length ? activities : blankActivities;

  const images: ImageProps[] = displayedActivities.map(a => ({
    src: a.image,
    alt: a.name
  }));

  let index: number = $state(0);
</script>

<div class="border rounded-lg bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md">
  <Carousel {images} bind:index>
    {#if images.length > 1}
      <Controls />
      <Indicators />
    {/if}
  </Carousel>
  <div class="m-6 p-4 lg:w-4/5 mx-auto">
    <div class="flex mb-2 gap-2">
      {#each displayedActivities[index]?.labels as label}
        <Badge color={label.color}>{label.name}</Badge>
      {/each}
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{displayedActivities[index]?.name}</h5>
    <p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">{displayedActivities[index]?.description}</p>
  </div>
</div>
