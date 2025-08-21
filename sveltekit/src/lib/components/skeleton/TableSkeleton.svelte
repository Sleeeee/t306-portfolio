<script lang="ts">
  interface Props {
    length: number;
  }

  let { length = 7 }: Props = $props();
</script>

<div role="status">

  <div class="flex gap-12 mx-6 my-2">
    <div class="h-2.5 w-1/10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
    <div class="h-2.5 w-1/10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
    <div class="h-2.5 w-1/10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
    <div class="h-2.5 w-1/10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
  </div>
  <div class="h-1 w-full mt-2 mb-4 border-t-1 border-gray-200"></div>

  <div role="status" class="space-y-4 max-w-full rounded-sm border border-gray-200 divide-y divide-gray-200 shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mx-auto p-4">
    {#each { length } }
      <div class="flex items-center justify-between gap-4">

        <div class="flex flex-col gap-2">
          <div class="mb-2.5 h-2.5 w-lg rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div class="h-2 w-md rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div class="h-2.5 w-sm rounded-full bg-gray-300 dark:bg-gray-700"></div>

        <div class="flex flex-col gap-2">
          <div class="h-2 w-xl rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div class="h-2.5 w-md rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 w-md rounded-full bg-gray-300 dark:bg-gray-700"></div>

      </div>
    {/each}

    <span class="sr-only">Loading...</span>
  </div>
</div>
