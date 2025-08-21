<script lang="ts">
  import type { FormActions, Label, ModalConfig, TableColumn, Technology } from '$lib/types';
  import { BaseTable, DeleteModal, ImageModal, LabelsCell, MasteryCell, TechnologyForm, TextModal } from '$lib';

  interface Props {
    items: Technology[];
    labels: Label[];
  }

  let { items, labels }: Props = $props();

  const columns: TableColumn[] = [
    { title: "Name", field: "name" },
    { title: "Labels", component: LabelsCell },
    { title: "Mastery", component: MasteryCell },
    { title: "Description", button: { key: "description", type: "text" }},
    { title: "Image", button: { key: "image", type: "image" }}
  ];

  const modals: ModalConfig[] = [
    { key: "description", title: "Read description", component: TextModal },
    { key: "image", title: "View image", component: ImageModal }
  ];

  const formActions: FormActions = {
    edit: { action: "?/editTechnology", component: TechnologyForm },
    delete: { action: "?/deleteTechnology", component: DeleteModal },
    create: { action: "?/createTechnology", component: TechnologyForm }
  };
</script>

<BaseTable
  {columns}
  {formActions}
  {items}
  {modals}
  {labels}
/>
