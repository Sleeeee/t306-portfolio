<script lang="ts">
  import type { ActionResponse } from '$lib/types';
  import { Alert } from 'flowbite-svelte';
  import { CheckCircleOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';

  interface Props {
    formResponse: ActionResponse;
    modal: boolean;
  }

  let { formResponse, modal }: Props = $props();
</script>

<Alert color={formResponse?.success ? "green" : "red"} class={`mb-4 ${modal ? "mt-8" : ""}`}>
  {#snippet icon()}
    {#if formResponse?.success}
      <CheckCircleOutline />
    {:else}
      <ExclamationCircleOutline />
    {/if}
  {/snippet}
  {formResponse?.message}
</Alert>
