<script lang="ts">
  import type { Item } from '$lib/types';
  import { Badge } from 'flowbite-svelte';

  interface Props {
    item: Item;
  }

  let { item }: Props = $props();
</script>

<div class="flex flex-wrap justify-center gap-2">
  {#each item.labels as label}
    <Badge color={label.color}>{label.name}</Badge>
  {/each}
</div>
