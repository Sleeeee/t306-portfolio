<script lang="ts">
  import type { Item } from '$lib/types';

  interface Props {
    item: Item;
    key: string;
  }

  let { item, key }: Props = $props();
</script>

<p>{item[key]}</p>
