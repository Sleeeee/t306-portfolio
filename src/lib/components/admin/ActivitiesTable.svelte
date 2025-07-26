<script lang="ts">
  import { ActivityForm, BaseTable, DateCell, DeleteModal, ImageModal, LabelsCell, TextModal } from '$lib';

  let { activities, labels } = $props();

  const columns = [
    { title: "Name", field: "name" },
    { title: "Labels", component: LabelsCell },
    { title: "Date", component: DateCell },
    { title: "Valued time (H)", field: "time_valued" },
    { title: "Real time (H)", field: "time_real" },
    { title: "Description", button: {
      key: "description",
      type: "text"
    }},
    { title: "Image", button: {
      key: "image",
      type: "image"
    }},
    { title: "Proof", button: {
      key: "proof",
      type: "image"
    }}
  ];
  const modals = [
    { key: "description", title: "Read description", component: TextModal },
    { key: "image", title: "View image", component: ImageModal },
    { key: "proof", title: "Review proof", component: ImageModal }
  ];
</script>

<BaseTable
  {columns}
  items={activities}
  {modals}
  {labels}
  editComponent={ActivityForm}
  deleteComponent={DeleteModal}
  createComponent={ActivityForm}
/>
