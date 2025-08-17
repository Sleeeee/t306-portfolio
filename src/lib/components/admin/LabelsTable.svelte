<script lang="ts">
  import type { FormActions, Label, TableColumn } from '$lib/types';
  import { BaseTable, ColorCell, DeleteModal, LabelForm } from '$lib';

  interface Props {
    items: Label[];
  }

  let { items }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Name", field: "name" },
    { title: "Color", component: ColorCell }
  ];

  const formActions: FormActions = {
    edit: { action: "?/editLabel", component: LabelForm },
    delete: { action: "?/deleteLabel", component: DeleteModal },
    create: { action: "?/createLabel", component: LabelForm }
  };
</script>

<BaseTable
  {columns}
  {formActions}
  {items}
/>
