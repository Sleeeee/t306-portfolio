<script lang="ts">
  import type { Technology } from '$lib/types';
  import { Progressradial } from 'flowbite-svelte';

  interface Props {
    item: Technology;
  }

  let { item }: Props = $props();
</script>

<Progressradial progress={item.mastery} size="w-12 h-12" labelInside />
