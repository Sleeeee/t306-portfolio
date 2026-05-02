<script lang="ts">
  import type { PageProps } from './$types';
  import type { Activity, ButtonConfig, Degree, Job, Label, Objective, Technology } from '$lib/types';
  import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';
  import { AdminTabs, Hero, TableSkeleton } from '$lib';
  import { adminDescription } from '$lib/constants';

  let { data }: PageProps = $props();

  const button: ButtonConfig = { icon: ArrowRightToBracketOutline, href: "/logout", text: "Logout" };
  const adminData: Promise<[Activity[], Degree[], Job[], Label[], Objective[], Technology[]]> = $derived(Promise.all([data.activities, data.degrees, data.jobs, data.labels, data.objectives, data.technologies]));
</script>

<Hero
  image="/favicon.png"
  title="Admin panel"
  description={adminDescription}
  {button}
/>

{#await adminData}
  <TableSkeleton />
{:then [activities, degrees, jobs, labels, objectives, technologies]}
  <AdminTabs {activities} {degrees} {jobs} {labels} {objectives} {technologies} />
{:catch error}
  <p class="text-red-800">Error fetching admin data: {error}</p>
{/await}
