<script lang="ts">
  import type { Degree, FormActions, ModalConfig, TableColumn } from '$lib/types';
  import { BaseTable, DateCell, DegreeForm, DeleteModal, TextModal } from '$lib';

  interface Props {
    items: Degree[];
  }

  let { items }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Degree", field: "degree" },
    { title: "Institution", field: "institution" },
    { title: "Start Date", component: DateCell, field: "date_start" },
    { title: "End Date", component: DateCell, field: "date_end" },
    { title: "Location", field: "location" },
    { title: "Description", button: { key: "description", type: "text" }}
  ];

  const modals: ModalConfig[] = [
    { key: "description", title: "Read description", component: TextModal }
  ];

  const formActions: FormActions = {
    edit: { action: "?/editDegree", component: DegreeForm },
    delete: { action: "?/deleteDegree", component: DeleteModal },
    create: { action: "?/createDegree", component: DegreeForm }
  };
</script>

<BaseTable
  {columns}
  {formActions}
  {items}
  {modals}
/>
