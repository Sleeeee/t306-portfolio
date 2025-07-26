<script lang="ts">
  import { BaseTable, ColorCell, DeleteModal, LabelForm } from '$lib';

  let { labels } = $props();

  const columns = [
    { title: "Name", field: "name" },
    { title: "Color", component: ColorCell }
  ];
</script>

<BaseTable
  {columns}
  items={labels}
  editComponent={LabelForm}
  deleteComponent={DeleteModal}
  createComponent={LabelForm}
/>
