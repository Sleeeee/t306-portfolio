<script lang="ts">
  import type { Technology } from '$lib/types';
  import { Badge, Gallery, Progressradial } from 'flowbite-svelte';
  import { technologiesDescription } from '$lib/constants';

  interface Props {
    technologies: Technology[];
  }

  let { technologies }: Props = $props();

  const blankTechnologies: Technology[] = [{ name: "No items found", labels: [], mastery: 0, description: "There is nothing to be displayed for now. Please come back later !", image: "/favicon.png" }];
  const displayedTechnologies: Technology[] = $derived(technologies?.length ? technologies : blankTechnologies);

  const getQuarter = (index: number): Technology[] => {
    const baseSize: number = Math.floor(displayedTechnologies.length / 4);
    const remainder: number = displayedTechnologies.length % 4;
    const startIndex: number = index * baseSize + Math.min(index, remainder);
    const endIndex: number = startIndex + baseSize + (index < remainder ? 1 : 0);
    return displayedTechnologies.slice(startIndex, endIndex);
  };

  let openIndex: number | null = $state(null);
  const expandCard = (index: number): void => {
    openIndex = index === openIndex ? null : index;
  };
</script>

<div class="w-full md:w-1/2 m-4 mx-auto p-4 backdrop-blur-sm bg-white/5 rounded-lg">
  <h2 class="mb-2 font-bold text-2xl dark:text-white">Technologies</h2>
  <p class="text-justify dark:text-white">{technologiesDescription}</p>
</div>

<Gallery class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  {#each { length: 4 }, index}
  <Gallery items={getQuarter(index)}>
    {#snippet figure(item)}
      <button onclick={() => { expandCard(item.id); }} class="p-2 sm:p-4 border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm bg-white/5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg dark:text-white cursor-pointer">
        <img src={item.image} alt={`Image for ${item.name}`} class="w-24 h-24 md:w-48 md:h-48 mx-auto mb-4" />

        {#if item.id === openIndex}
          <div class="flex mb-2 gap-2">
            {#each item.labels as label}
              <Badge color={label.color}>{label.name}</Badge>
            {/each}
          </div>

          <div class="flex flex-wrap justify-around items-center">
            <h5 class="mb-2 text-2xl font-bold tracking-tight">
              {item.name}
            </h5>
            <Progressradial progress={item.mastery} size="w-12 h-12" labelInside class="dark:text-white" />
          </div>

          <p class="text-justify">{item.description}</p>
        {/if}
      </button>
    {/snippet}
  </Gallery>
  {/each}
</Gallery>
