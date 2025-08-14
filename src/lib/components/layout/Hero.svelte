<script lang="ts">
  import type { Component } from 'svelte';
  import type { ButtonConfig } from '$lib/types';
  import { Avatar, Button } from 'flowbite-svelte';

  interface Props {
    image: string;
    title: string;
    description: string;
    button: ButtonConfig
  }

  let { image, title, description, button }: Props = $props();
</script>

<div class="m-6 flex flex-col md:flex-row justify-around items-center gap-4 text-center md:text-left dark:text-white">
  {#if image}
    <Avatar src={image} size="xl" border class="md:order-2" />
  {/if}

  <div class="w-4/5 md:w-2/5 order-1">
    <h1 class="mb-4 text-4xl font-bold">{title}</h1>
    <p>{description}</p>

    {#if button}
      <Button outline size="md" href={button.href} onclick={button.onclick} target="_blank" class="mt-4 gap-2">
        {button.text}
        {@const Icon = button.icon}
        <Icon />
      </Button>
    {/if}
  </div>
</div>
