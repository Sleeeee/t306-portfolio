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

  let { imageLight, imageDark, title, description, button }: Props = $props();
</script>

<div class="bg-pattern-hard p-6 mb-4 rounded-lg flex flex-col md:flex-row justify-around items-center gap-4 text-center md:text-left dark:text-white">
  {#if imageLight}
    <Avatar src={imageLight} size="xl" border class="dark:hidden md:order-2" />
  {/if}
  {#if imageDark}
    <Avatar src={imageDark} size="xl" border class="hidden dark:block md:order-2" />
  {/if}

  <div class="w-4/5 md:w-2/5 p-4 order-1 backdrop-blur-sm rounded-lg bg-white/5">
    <h1 class="mb-4 text-4xl font-bold">{title}</h1>
    <p>{description}</p>

    {#if button}
      <Button outline size="md" href={button.href} onclick={button.onclick} target={button.target} class="mt-4 gap-2">
        {button.text}
        {@const Icon = button.icon}
        <Icon />
      </Button>
    {/if}
  </div>
</div>
