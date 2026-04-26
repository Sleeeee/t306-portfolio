<script lang="ts">
  import type { Activity, ImageProps } from '$lib/types';
  import { Badge, Carousel, Controls } from 'flowbite-svelte';

  interface Props {
    activities: Activity[];
  }

  let { activities }: Props = $props();

  const blankActivities: Activity[] = [{ name: "No items found", labels: [], date: new Date(), time_valued: 0, time_real: 0, description: "There is nothing to be displayed for now. Please come back later !", image: "/favicon.png", proof: "/favicon.png" }];
  const displayedActivities: Activity[] = $derived(activities?.length ? activities : blankActivities);

  const images: ImageProps[] = $derived(displayedActivities.map(a => ({
    src: a.image,
    alt: a.name
  })));

  let index: number = $state(0);
</script>

<div class="bg-pattern-soft rounded-lg shadow-md pb-1">
  <Carousel {images} bind:index>
    {#if images.length > 1}
      <Controls />
    {/if}
  </Carousel>
  <div class="m-10 p-4 lg:w-4/5 mx-auto backdrop-blur-sm bg-white/5 rounded-lg">
    <div class="flex mb-2 gap-2">
      {#each displayedActivities[index]?.labels as label}
        <Badge color={label.color}>{label.name}</Badge>
      {/each}
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{displayedActivities[index]?.name}</h5>
    <p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">{displayedActivities[index]?.description}</p>
  </div>
</div>
