<script lang="ts">
  import type { Objective } from '$lib/types';
  import { FlagSolid } from 'flowbite-svelte-icons';
  import { objectivesDescription } from '$lib/constants';

  interface Props {
    objectives: Objective[];
  }

  let { objectives }: Props = $props();
</script>

<div class="w-full md:w-1/2 m-4 mx-auto p-4 backdrop-blur-sm bg-white/5 rounded-lg text-center">
  <h2 class="mb-2 font-bold text-2xl dark:text-white">Objectives</h2>
  <p class="dark:text-white">{objectivesDescription}</p>
</div>

<div class="flex flex-wrap justify-center items-stretch gap-6 w-full p-4">
  {#each objectives as objective}
    <div class="w-full max-w-sm">
      <div class="p-2 sm:p-4 border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm bg-white/5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg dark:text-white">
        <span class="bg-primary-200 dark:bg-primary-900 absolute -start-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full">
          <FlagSolid class="text-primary-500 h-5 w-5" />
        </span>

        <h5 class="mb-2 text-xl font-bold">
          {objective.name}
        </h5>
        <p class="dark:text-gray-300 flex-grow">
          {objective.description}
        </p>
      </div>
    </div>
  {/each}
</div>
