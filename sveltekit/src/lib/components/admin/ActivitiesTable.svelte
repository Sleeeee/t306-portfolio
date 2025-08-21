<script lang="ts">
  import type { Activity, FormActions, Label, ModalConfig, TableColumn } from '$lib/types';
  import { ActivityForm, BaseTable, DateCell, DeleteModal, ImageModal, LabelsCell, TextModal } from '$lib';

  interface Props {
    items: Activity[];
    labels: Label[];
  }

  let { items, labels }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Name", field: "name" },
    { title: "Labels", component: LabelsCell },
    { title: "Date", component: DateCell },
    { title: "Valued time (H)", field: "time_valued" },
    { title: "Real time (H)", field: "time_real" },
    { title: "Description", button: { key: "description", type: "text" }},
    { title: "Image", button: { key: "image", type: "image" }},
    { title: "Proof", button: { key: "proof", type: "image" }}
  ];

  const modals: ModalConfig[] = [
    { key: "description", title: "Read description", component: TextModal },
    { key: "image", title: "View image", component: ImageModal },
    { key: "proof", title: "Review proof", component: ImageModal }
  ];

  const formActions: FormActions = {
    edit: { action: "?/editActivity", component: ActivityForm },
    delete: { action: "?/deleteActivity", component: DeleteModal },
    create: { action: "?/createActivity", component: ActivityForm }
  };
</script>

<BaseTable
  {columns}
  {formActions}
  {items}
  {modals}
  {labels}
/>
