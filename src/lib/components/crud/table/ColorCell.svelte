<script lang="ts">
  import type { Label } from '$lib/types';
  import { Badge } from 'flowbite-svelte';

  interface Props {
    item: Label;
  }

  let { item }: Props = $props();
</script>

<Badge color={item.color} pill>
  {item.color}
</Badge>
