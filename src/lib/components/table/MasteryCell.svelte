<script lang="ts">
  import { Progressradial } from 'flowbite-svelte';

  let { item } = $props();
</script>

<Progressradial progress={item.mastery} size="w-12 h-12" labelInside />
