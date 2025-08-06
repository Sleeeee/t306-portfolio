<script lang="ts">
  import type { Activity } from '$lib/types';

  interface Props {
    item: Activity;
  }

  let { item }: Props = $props();
</script>

{item.date.toLocaleDateString()}
