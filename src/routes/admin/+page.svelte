<script lang="ts">
  import type { PageProps } from './$types';
  import { AdminTabs, Hero, TableSkeleton } from '$lib';

  let { data }: PageProps = $props();

  const adminData = $derived(Promise.all([data.activities, data.labels, data.technologies]));
</script>

<div class="p-8">
	<Hero
    image="/favicon.png"
    title="Admin panel"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet arcu finibus, varius augue ac."
  />

  {#await adminData}
    <TableSkeleton />
  {:then [activities, labels, technologies]}
    <AdminTabs {activities} {labels} {technologies} />
  {:catch error}
    <p class="text-red-800">Error fetching admin data: {error}</p>
  {/await}
</div>
