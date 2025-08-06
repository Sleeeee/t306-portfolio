<script lang="ts">
  import type { Component } from 'svelte';
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
    editComponent: Component;
    deleteComponent: Component;
    createComponent: Component;
  }

  let { columns, formActions, items, modals, labels, editComponent = null, deleteComponent = null, createComponent = null }: Props = $props();

  let activeDialog: string | null = $state(null);
  let itemIndex: number | null = $state(null);

  const openDialog = (dialogType: string, index: number | null = null) => {
    activeDialog = dialogType;
    itemIndex = index;
  };
  const closeDialog = () => {
    activeDialog = null;
    itemIndex = null;
  };

  let isEditHidden: boolean = $derived(activeDialog !== "edit");
  let isDeleteOpen: boolean = $derived(activeDialog === "delete");
  let isCreateHidden: boolean = $derived(activeDialog !== "create");
</script>

{#if editComponent}
  <Drawer bind:hidden={isEditHidden} placement="right" closeDrawer={closeDialog}>
    {@const EditComponent = editComponent}
    <EditComponent {closeDialog} formAction={formActions?.edit} item={itemIndex !== null ? items[itemIndex] : null} {labels} />
  </Drawer>
{/if}

{#if deleteComponent}
  <Modal bind:open={isDeleteOpen} size="lg" transition={slide} onclose={closeDialog}>
    {@const DeleteComponent = deleteComponent}
    <DeleteComponent {closeDialog} formAction={formActions?.delete} item={itemIndex !== null ? items[itemIndex] : null} />
  </Modal>
{/if}

{#if createComponent}
  <Drawer bind:hidden={isCreateHidden} closeDrawer={closeDialog}>
    {@const CreateComponent = createComponent}
    <CreateComponent {closeDialog} formAction={formActions?.create} item={itemIndex !== null ? items[itemIndex] : null} {labels} />
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
    {#if editComponent || deleteComponent}
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
              <ColumnComponent {item} />
            {:else if column.button}
              <ModalButton type={column.button.type} onclick={() => { openDialog(column.button.key, i); }} />
            {:else}
              {item[column.field]}
            {/if}
          </TableBodyCell>
        {/each}
        {#if editComponent || deleteComponent}
          <TableBodyCell>
            {#if editComponent}
              <Button size="xs" onclick={() => { openDialog("edit", i); }} pill><EditOutline /></Button>
            {/if}
            {#if deleteComponent}
              <Button size="xs" onclick={() => { openDialog("delete", i)}} pill><TrashBinOutline /></Button>
            {/if}
          </TableBodyCell>
        {/if}
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

{#if createComponent}
  <Button size="xs" onclick={() => { openDialog("create", null)}} pill class="mt-4 ml-4"><PlusOutline /></Button>
{/if}
