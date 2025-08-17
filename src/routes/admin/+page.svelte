<script lang="ts">
  import type { PageProps } from './$types';
  import type { Activity, Degree, Job, Label, Technology } from '$lib/types';
  import { AdminTabs, Hero, TableSkeleton } from '$lib';

  let { data }: PageProps = $props();

  const adminData: Promise<[Activity[], Degree[], Job[], Label[], Technology[]]> = $derived(Promise.all([data.activities, data.degrees, data.jobs, data.labels, data.technologies]));
</script>

<Hero
  image="/favicon.png"
  title="Admin panel"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet arcu finibus, varius augue ac."
/>

{#await adminData}
  <TableSkeleton />
{:then [activities, degrees, jobs, labels, technologies]}
  <AdminTabs {activities} {degrees} {jobs} {labels} {technologies} />
{:catch error}
  <p class="text-red-800">Error fetching admin data: {error}</p>
{/await}
