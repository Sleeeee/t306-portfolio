<script lang="ts">
  import type { FormActions, ModalConfig, Objective, TableColumn } from '$lib/types';
  import { BaseTable, DeleteModal, ObjectiveForm, TextModal } from '$lib';

  interface Props {
    items: Objective[];
  }

  let { items }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Name", field: "name" },
    { title: "Description", button: { key: "description", type: "text" }},
  ];

  const modals: ModalConfig[] = [
    { key: "description", title: "Read description", component: TextModal },
  ];

  const formActions: FormActions = {
    edit: { action: "?/editObjective", component: ObjectiveForm },
    delete: { action: "?/deleteObjective", component: DeleteModal },
    create: { action: "?/createObjective", component: ObjectiveForm }
  };
</script>

<BaseTable
  {columns}
  {formActions}
  {items}
  {modals}
/>
