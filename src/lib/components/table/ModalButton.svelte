<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import { BookOpenOutline, ImageOutline } from 'flowbite-svelte-icons';

  let { type, onclick } = $props();

  const text = (type === "image") ? "View" : "Read";
  const Icon = (type === "image") ? ImageOutline : BookOpenOutline;
</script>

<Button outline size="xs" onclick={onclick} class="gap-2">
  {text}
  <Icon />
</Button>
