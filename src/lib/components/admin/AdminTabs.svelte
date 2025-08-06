<script lang="ts">
  import type { Activity, Label, Technology } from '$lib/types';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { ActivitiesTable, LabelsTable, TechnologiesTable } from '$lib';

  interface Props {
    activities: Activity[];
    labels: Label[];
    technologies: Technology[];
  }

  let { activities, labels, technologies }: Props = $props();
</script>

<Tabs tabStyle="underline">
  <TabItem title="Activities" open>
    <ActivitiesTable {activities} {labels} />
  </TabItem>
  <TabItem title="Labels">
    <LabelsTable {labels} />
  </TabItem>
  <TabItem title="Technologies">
    <TechnologiesTable {labels} {technologies} />
  </TabItem>
</Tabs>
