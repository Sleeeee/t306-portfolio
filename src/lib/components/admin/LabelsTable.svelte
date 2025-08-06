<script lang="ts">
  import type { FormActions, Label, TableColumn } from '$lib/types';
  import { BaseTable, ColorCell, DeleteModal, LabelForm } from '$lib';

  interface Props {
    labels: Label[];
  }

  let { labels }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Name", field: "name" },
    { title: "Color", component: ColorCell }
  ];

  const formActions: FormActions = {
    edit: "?/editLabel",
    delete: "?/deleteLabel",
    create: "?/createLabel"
  }
</script>

<BaseTable
  {columns}
  {formActions}
  items={labels}
  editComponent={LabelForm}
  deleteComponent={DeleteModal}
  createComponent={LabelForm}
/>
