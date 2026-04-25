<script lang="ts">
  import type { Item } from '$lib/types';

  interface Props {
    field: string | undefined;
    item: Item;
  }

  let { field, item }: Props = $props();

  const dateField: string = $derived(field ? field : "date");
</script>

{item[dateField]?.toLocaleDateString()}
