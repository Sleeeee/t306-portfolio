<script lang="ts">
  import { Avatar, Button } from 'flowbite-svelte';

  interface Props {
    title: string;
    description: string;
    onButtonClick: () => void;
  }

  let { title, description, onButtonClick }: Props = $props();
</script>

<div class="m-6 flex flex-col md:flex-row justify-around items-center gap-4 text-center md:text-left">
  <div class="w-4/5 md:w-2/5">
    <h1 class="mb-4 text-4xl font-bold">{title}</h1>
    <p>{description}</p>
    {#if onButtonClick}
      <Button class="mt-4" onclick={onButtonClick}>View summary</Button>
    {/if}
  </div>
  <Avatar size="xl" border />
</div>
