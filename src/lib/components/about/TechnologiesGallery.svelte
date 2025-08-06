<script lang="ts">
  import type { Technology } from '$lib/types';
  import { Badge, Gallery, Progressradial } from 'flowbite-svelte';

  interface Props {
    technologies: Technology[];
  }

  let { technologies }: Props = $props();

  const getQuarter = (index: number): Technology[] => {
    const baseSize: number = Math.floor(technologies.length / 4);
    const remainder: number = technologies.length % 4;
    const startIndex: number = index * baseSize + Math.min(index, remainder);
    const endIndex: number = startIndex + baseSize + (index < remainder ? 1 : 0);
    return technologies.slice(startIndex, endIndex);
  };

  let openIndex: number | null = $state(null);
  const expandCard = (index: number): void => {
    openIndex = index === openIndex ? null : index;
  };
</script>

<Gallery class="grid-cols-2 lg:grid-cols-4 gap-4">
  {#each { length: 4 }, index}
    <Gallery items={getQuarter(index)}>
      {#snippet figure(item)}
        <button onclick={() => { expandCard(item.id); }} class="p-2 sm:p-4 border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md rounded-lg">
          <img src={item.image} alt={`Image for ${item.name}`} class="w-24 h-24 md:w-48 md:h-48 mx-auto mb-4" />

          {#if item.id === openIndex}
            <div class="flex mb-2 gap-2">
              {#each item.labels as label}
                <Badge color={label.color}>{label.name}</Badge>
              {/each}
            </div>

            <div class="flex flex-wrap justify-around items-center">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <Progressradial progress={item.mastery} size="w-12 h-12" labelInside />
            </div>

            <p class="text-justify">{item.description}</p>
          {/if}
        </button>
      {/snippet}
    </Gallery>
  {/each}
</Gallery>
