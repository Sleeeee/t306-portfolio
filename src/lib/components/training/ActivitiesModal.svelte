<script lang="ts">
  import type { Activity } from '$lib/types';
  import { Button, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { BookOpenOutline } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';

  interface Props {
    activities: Activity[];
    isOpen: boolean;
  }

  let { activities, isOpen = $bindable() }: Props = $props();
  let proofIndex: number | null = $state(null);
  const viewProof = (index: number | null): void => {
    proofIndex = index;
  };
</script>

<Modal title="Activities Summary" bind:open={isOpen} onclose={() => { viewProof(null); }} size="lg" transition={slide}>
  {#if proofIndex !== null}
    <img src={activities[proofIndex].proof} alt={`Proof for the activity ${activities[proofIndex].name}`} class="mx-auto rounded-lg" />
    <Button onclick={() => { viewProof(null); }}>Back</Button>
  {:else}
    <Table hoverable={true}>
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Date</TableHeadCell>
        <TableHeadCell>Valued Time (h)</TableHeadCell>
        <TableHeadCell>Real Time (h)</TableHeadCell>
        <TableHeadCell>Proof</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each activities as activity, i}
          <TableBodyRow>
            <TableBodyCell>{activity.name}</TableBodyCell>
            <TableBodyCell>{activity.date.toLocaleDateString()}</TableBodyCell>
            <TableBodyCell>{activity.time_valued}</TableBodyCell>
            <TableBodyCell>{activity.time_real}</TableBodyCell>
            <TableBodyCell>
              <Button outline size="xs" onclick={() => { viewProof(i); }} class="gap-2">
                View <BookOpenOutline />
              </Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {/if}
</Modal>
