<script lang="ts">
  import { Badge } from 'flowbite-svelte';

  let { item } = $props();
</script>

<div class="flex flex-wrap justify-center gap-2">
  {#each item.labels as label}
    <Badge color={label.color}>{label.name}</Badge>
  {/each}
</div>
