<script lang="ts">
  import type { Activity, ImageProps } from '$lib/types';
	import { Badge, Carousel, Controls, Indicators } from 'flowbite-svelte';

  interface Props {
    activities: Activity[];
  }

  let { activities }: Props = $props();

  const images: ImageProps[] = activities.map(a => ({
    src: a.image,
    alt: a.name
  }));

  let index: number = $state(0);
</script>

<div class="border rounded-lg bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md">
  <Carousel {images} bind:index>
    <Controls />
    <Indicators />
  </Carousel>
  <div class="m-6 p-4 lg:w-4/5 mx-auto">
    <div class="flex mb-2 gap-2">
      {#each activities[index]?.labels as label}
        <Badge color={label.color}>{label.name}</Badge>
      {/each}
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{activities[index]?.name}</h5>
    <p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">{activities[index]?.description}</p>
  </div>
</div>
