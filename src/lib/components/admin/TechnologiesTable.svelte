<script lang="ts">
  import { BaseTable, DeleteModal, ImageModal, LabelsCell, MasteryCell, TechnologyForm, TextModal } from '$lib';

  let { labels, technologies } = $props();

  const columns = [
    { title: "Name", field: "name" },
    { title: "Labels", component: LabelsCell },
    { title: "Mastery", component: MasteryCell },
    { title: "Description", button: {
      key: "description",
      type: "text"
    }},
    { title: "Image", button: {
      key: "image",
      type: "image"
    }}
  ];
  const modals = [
    { key: "description", title: "Read description", component: TextModal },
    { key: "image", title: "View image", component: ImageModal }
  ];
</script>

<BaseTable
  {columns}
  items={technologies}
  {modals}
  {labels}
  editComponent={TechnologyForm}
  deleteComponent={DeleteModal}
  createComponent={TechnologyForm}
/>
