<script lang="ts">
  import type { Item } from '$lib/types';

  interface Props {
    item: Item;
    key: string;
  }

  let { item, key }: Props = $props();
</script>

<img src={item[key]} alt={`${key} for ${item.name}`} class="mx-auto rounded-lg" />
