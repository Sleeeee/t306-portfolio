<script lang="ts">
  import type { FormActions, Item, Label, ModalConfig, TableColumn } from '$lib/types';
  import { Button, Drawer, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { EditOutline, PlusOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';
  import { ModalButton } from '$lib';

  interface Props {
    columns: TableColumn[];
    formActions: FormActions;
    items: Item[];
    modals: ModalConfig[];
    labels: Label[];
  }

  let { columns, formActions, items, modals, labels }: Props = $props();

  let activeDialog: string | null = $state(null);
  let itemIndex: number | null = $state(null);

  const openDialog = (dialogType: string, index: number | null = null): void => {
    activeDialog = dialogType;
    itemIndex = index;
  };
  const closeDialog = (): void => {
    activeDialog = null;
    itemIndex = null;
  };

  let isEditHidden: boolean = $derived(activeDialog !== "edit");
  let isDeleteOpen: boolean = $derived(activeDialog === "delete");
  let isCreateHidden: boolean = $derived(activeDialog !== "create");
</script>

{#if formActions?.edit}
  <Drawer bind:hidden={isEditHidden} placement="right" closeDrawer={closeDialog}>
    {@const EditComponent = formActions.edit.component}
    <EditComponent {closeDialog} formAction={formActions.edit.action} item={itemIndex !== null ? items[itemIndex] : null} {labels} />
  </Drawer>
{/if}

{#if formActions?.delete}
  <Modal bind:open={isDeleteOpen} size="lg" transition={slide} onclose={closeDialog}>
    {@const DeleteComponent = formActions.delete.component}
    <DeleteComponent {closeDialog} formAction={formActions.delete.action} item={itemIndex !== null ? items[itemIndex] : null} />
  </Modal>
{/if}

{#if formActions?.create}
  <Drawer bind:hidden={isCreateHidden} closeDrawer={closeDialog}>
    {@const CreateComponent = formActions.create.component}
    <CreateComponent {closeDialog} formAction={formActions.create.action} item={itemIndex !== null ? items[itemIndex] : null} {labels} />
  </Drawer>
{/if}

{#each modals as modal}
  <Modal title={modal.title} open={activeDialog === modal.key} {closeDialog} size="lg" transition={slide} onclose={closeDialog}>
    {@const ModalComponent = modal.component}
    <ModalComponent item={itemIndex !== null ? items[itemIndex] : null} key={modal.key} />
  </Modal>
{/each}

<Table hoverable class="text-center">
  <TableHead>
    {#each columns as column}
      <TableHeadCell>{column.title}</TableHeadCell>
    {/each}
    {#if formActions?.edit || formActions?.delete}
      <TableHeadCell>Actions</TableHeadCell>
    {/if}
  </TableHead>
  <TableBody>
    {#each items as item, i}
      <TableBodyRow>
        {#each columns as column}
          <TableBodyCell class="!text-wrap">
            {#if column.component}
              {@const ColumnComponent = column.component}
              <ColumnComponent {item} field={column.field} />
            {:else if column.button}
              <ModalButton type={column.button.type} onclick={() => { openDialog(column.button.key, i); }} />
            {:else}
              {item[column.field]}
            {/if}
          </TableBodyCell>
        {/each}
        {#if formActions?.edit || formActions?.delete}
          <TableBodyCell>
            {#if formActions.edit}
              <Button size="xs" onclick={() => { openDialog("edit", i); }} class="dark:text-gray-300" pill><EditOutline /></Button>
            {/if}
            {#if formActions.delete}
              <Button size="xs" onclick={() => { openDialog("delete", i)}} class="dark:text-gray-300" pill><TrashBinOutline /></Button>
            {/if}
          </TableBodyCell>
        {/if}
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

{#if formActions?.create}
  <Button size="xs" onclick={() => { openDialog("create", null)}} pill class="mt-4 ml-4 dark:text-gray-300"><PlusOutline /></Button>
{/if}
