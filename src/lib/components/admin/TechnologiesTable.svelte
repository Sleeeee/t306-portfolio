<script lang="ts">
  import type { FormActions, Label, ModalConfig, TableColumn, Technology } from '$lib/types';
  import { BaseTable, DeleteModal, ImageModal, LabelsCell, MasteryCell, TechnologyForm, TextModal } from '$lib';

  interface Props {
    labels: Label[];
    technologies: Technology[];
  }

  let { labels, technologies }: Props = $props();

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
    edit: "?/editTechnology",
    delete: "?/deleteTechnology",
    create: "?/createTechnology"
  }
</script>

<BaseTable
  {columns}
  {formActions}
  items={technologies}
  {modals}
  {labels}
  editComponent={TechnologyForm}
  deleteComponent={DeleteModal}
  createComponent={TechnologyForm}
/>
