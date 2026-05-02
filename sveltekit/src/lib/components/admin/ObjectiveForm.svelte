<script lang="ts">
  import type { FormField, Label, Objective } from '$lib/types';
  import { BaseForm, IdHiddenInput, TextAreaInput, TextInput } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Objective;
  }

  let { closeDialog, formAction, item }: Props = $props();

  const fields: FormField[] = $derived([
    { title: "id", component: IdHiddenInput, defaultValue: null },
    { title: "name", component: TextInput, defaultValue: "", label: "Name",  placeholder: "Enter name" },
    { title: "description", component: TextAreaInput, defaultValue: "", label: "Description", placeholder: "Write about the objective..." },
  ]);
</script>

<BaseForm
  {closeDialog}
  {fields}
  {formAction}
  {item}
  itemType="objective"
/>
