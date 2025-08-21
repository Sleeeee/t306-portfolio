<script lang="ts">
  import type { Component } from 'svelte';
  import { Button } from 'flowbite-svelte';
  import { BookOpenOutline, ImageOutline } from 'flowbite-svelte-icons';

  interface Props {
    type: "image" | "text";
    onclick: () => void;
  }

  let { type, onclick }: Props = $props();

  const text: string = (type === "image") ? "View" : "Read";
  const Icon: Component = (type === "image") ? ImageOutline : BookOpenOutline;
</script>

<Button outline size="xs" onclick={onclick} class="gap-2">
  {text}
  <Icon />
</Button>
