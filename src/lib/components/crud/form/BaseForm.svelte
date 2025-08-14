<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionResponse, FormField, Item } from '$lib/types';
  import { validImageFields } from '$lib/constants';
  import { Button, CloseButton } from 'flowbite-svelte';
  import { FeedbackAlert } from '$lib';

  interface Props {
    closeDialog: () => void;
    fields: FormField[];
    formAction: string;
    item: Item;
    itemType: string;
  }

  let { closeDialog, fields, formAction, item, itemType }: Props = $props();

  const blankItem: Record<string, any> = Object.fromEntries(fields.map(field => [field.title, field.defaultValue]));
  const formItem: Record<string, any> = $state(item || blankItem);
  if (item?.labels) {
    formItem.labels = item.labels.map((l) => (l.id));
  }

  let formResponse: ActionResponse | null = $state(null);
  let loading: boolean = $state(false);
  const enhanceHandler = ({ cancel, formData }) => {
    loading = true;

    // Remove unmodified fields when editing
    for (let field in item) {
      if (field === "id") { continue; }
      if (field === "labels") {
        const itemLabels: string[] = item[field].map(label => String(label.id));
        const formLabels: string[] = formData.getAll(field);
        if ((itemLabels.length === formLabels.length) && (itemLabels.every(id => formLabels.includes(id)))) {
          formData.delete(field);
        }
      } else if (validImageFields.includes(field) && !formData.get(field).size) {
        formData.delete(field);
      } else if (item[field] == formData.get(field)) {
        formData.delete(field);
      }
    }

    // Cancel if all fields are unmodified (filter out the id that is never removed)
    if (![...formData.keys()].filter(key => key !== "id").length) {
      cancel();
      formResponse = { success: false, message: "At least one field must be modified to edit this item" };
      loading = false;
    }

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

<div class="flex items-center justify-between mb-4">
  <h5 class="font-bold dark:text-white">
    {(item) ? "Edit" : "Create"} {itemType}
  </h5>
  <CloseButton onclick={closeDialog} />
</div>

{#if formResponse}
  <FeedbackAlert {formResponse} />
{/if}

<form method="POST" action={formAction} enctype="multipart/form-data" use:enhance={enhanceHandler}>
  {#each fields as field}
    {@const FieldComponent = field.component}
    <FieldComponent bind:value={formItem[field.title]} items={field.items} label={field.label} name={field.title} placeholder={field.placeholder} required={field.required} style={field.style} />
  {/each}

  <Button type="submit" disabled={loading} class="w-full">
    {(item) ? "Edit" : "Create"} {itemType}
  </Button>
</form>
