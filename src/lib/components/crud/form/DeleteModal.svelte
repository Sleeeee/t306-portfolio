<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionResponse, Item } from '$lib/types';
  import { Button } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import { FeedbackAlert } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Item;
  }

  let { closeDialog, formAction, item }: Props = $props();

  let formResponse: ActionResponse | null = $state(null);
  let loading: boolean = $state(false);
  const enhanceHandler = () => {
    loading = true;

    return async ({ result, update }) => {
      formResponse = result.data;
      await update();
    };
  };
  $effect(() => {
    if (formResponse?.success) {
      setTimeout(() => {
        closeDialog();
        formResponse = null;
        loading = false;
      }, 500);
    } else {
      loading = false;
    }
  });
</script>

{#if formResponse}
  <FeedbackAlert {formResponse} modal />
{/if}

<form method="POST" action={formAction} use:enhance={enhanceHandler}>
  <input type="hidden" name="id" value={item?.id} />

  <ExclamationCircleOutline class="mb-4 mx-auto w-12 h-12" />
  <h3 class="mb-4 text-center">
    Are you sure you want to delete <strong class="font-bold">{item?.name}</strong> ?
  </h3>
  <div class="flex justify-center gap-4">
    <Button type="submit" value="delete">Delete</Button>
    <Button onclick={closeDialog} outline autofocus>Cancel</Button>
  </div>
</form>
