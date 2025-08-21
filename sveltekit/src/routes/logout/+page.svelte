<script lang="ts">
  import type { PageProps } from '$types';
  import type { ActionResponse } from '$lib/types';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { Button } from 'flowbite-svelte';
  import { ArrowLeftToBracketOutline, HomeOutline } from 'flowbite-svelte-icons';
  import { FeedbackAlert } from '$lib';

  let { form }: PageProps = $props();
  let formResponse: ActionResponse = $derived.by(() => {
    if (form === null) return;
    return (form) ? { success: true, message: "Logout successful" } : { success: false, message: "You are not authenticated" };
  });

  let formElement: HTMLElement;
  onMount(() => { formElement?.requestSubmit(); });
</script>

<div class="flex flex-col justify-center items-center">
  {#if formResponse}
    <FeedbackAlert {formResponse} />
  {/if}

  <div class="flex gap-4 mt-6">
    <Button href="/login" size="lg" outline class="gap-2">
      To login page
      <ArrowLeftToBracketOutline />
    </Button>

    <Button href="/" size="lg" class="gap-2">
      To home page
      <HomeOutline />
    </Button>
  </div>

  <form bind:this={formElement} method="POST" use:enhance></form>
</div>
