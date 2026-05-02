<script lang="ts">
  import type { TimelineItemConfig } from '$lib/types';
  import { Timeline, TimelineItem } from 'flowbite-svelte';
  import { CalendarWeekSolid, MapPinAltSolid } from 'flowbite-svelte-icons';

  interface Props {
    items: TimelineItemConfig[];
  }

  let { items }: Props = $props();
</script>

<Timeline order="vertical" class="w-4/5 lg:w-1/2 mx-auto p-4 dark:text-white backdrop-blur-sm bg-white/5 rounded-lg">
  {#each items as item}
    <TimelineItem title={item.title}>
      {#snippet orientationSlot()}
        {@const Icon = item.icon}
        <span class="bg-primary-200 dark:bg-primary-900 absolute -start-5 flex h-8 w-8 items-center justify-center rounded-full">
          <Icon class="text-primary-600 dark:text-primary-400 h-5 w-5" />
        </span>
      {/snippet}

      <div class="flex flex-col md:flex-row justify-between mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        <div class="flex gap-2 items-center">
          <CalendarWeekSolid />
          <p>{item.date}</p>
        </div>

        <div class="flex gap-2 items-center">
          <MapPinAltSolid class="md:order-2" />
          <p>{item.location}</p>
        </div>
      </div>

      <p class="text-justify">{item.description}</p>
    </TimelineItem>
  {/each}
</Timeline>
