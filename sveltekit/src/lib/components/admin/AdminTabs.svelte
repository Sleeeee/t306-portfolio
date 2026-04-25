<script lang="ts">
  import type { Activity, Degree, Job, Label, Technology } from '$lib/types';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { BriefcaseSolid, FolderOpenSolid, GraduationCapSolid, LabelSolid, LaptopCodeSolid } from 'flowbite-svelte-icons';
  import { ActivitiesTable, DegreesTable, JobsTable, LabelsTable, TechnologiesTable } from '$lib';

  interface Props {
    activities: Activity[];
    degrees: Degree[];
    jobs: Job[];
    labels: Label[];
    technologies: Technology[];
  }

  let { activities, degrees, jobs, labels, technologies }: Props = $props();

  const tabs = $derived([
    { title: "Activities", component: ActivitiesTable, icon: FolderOpenSolid, items: activities, labels: labels, open: true },
    { title: "Degrees", component: DegreesTable, icon: GraduationCapSolid, items: degrees },
    { title: "Jobs", component: JobsTable, icon: BriefcaseSolid, items: jobs },
    { title: "Labels", component: LabelsTable, icon: LabelSolid, items: labels },
    { title: "Technologies", component: TechnologiesTable, icon: LaptopCodeSolid, items: technologies, labels }
  ]);
</script>

<Tabs tabStyle="underline">
  {#each tabs as tab}
    <TabItem open={tab.open}>
      {#snippet titleSlot()}
        {@const Icon = tab.icon}
        <div class="flex items-center gap-2">
          <Icon />
          {tab.title}
        </div>
      {/snippet}

      {@const Component = tab.component}
      <Component items={tab.items} labels={tab.labels} />
    </TabItem>
  {/each}
</Tabs>
