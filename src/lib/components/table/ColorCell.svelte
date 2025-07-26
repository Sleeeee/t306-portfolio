<script lang="ts">
  import { Badge } from 'flowbite-svelte';

  let { item } = $props();
</script>

<Badge color={item.color} pill>
  {item.color}
</Badge>
