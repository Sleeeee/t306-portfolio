<script lang="ts">
	import { Badge, Carousel, Controls, Indicators } from 'flowbite-svelte';

  let { activities, imageActivities } = $props();
  let index = $state(0);
</script>

<div class="border rounded-lg bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md">
  <Carousel images={imageActivities} bind:index>
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
