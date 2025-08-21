<script lang="ts">
  import type { FormActions, Job, TableColumn } from '$lib/types';
  import { BaseTable, DateCell, DeleteModal, JobForm, TextModal } from '$lib';

  interface Props {
    items: Job[];
  }

  let { items }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Position", field: "position" },
    { title: "Company", field: "company" },
    { title: "Start Date", component: DateCell, field: "date_start" },
    { title: "End Date", component: DateCell, field: "date_end" },
    { title: "Location", field: "location" },
    { title: "Description", button: { key: "description", type: "text" }}
  ];

  const modals: ModalConfig[] = [
    { key: "description", title: "Read description", component: TextModal }
  ];

  const formActions: FormActions = {
    edit: { action: "?/editJob", component: JobForm },
    delete: { action: "?/deleteJob", component: DeleteModal },
    create: { action: "?/createJob", component: JobForm }
  };
</script>

<BaseTable
  {columns}
  {formActions}
  {items}
  {modals}
/>
