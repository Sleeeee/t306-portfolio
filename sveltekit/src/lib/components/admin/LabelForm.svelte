<script lang="ts">
  import type { FormField, Label } from '$lib/types';
  import { BaseForm, ColorInput, IdHiddenInput, TextInput } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Label;
  }

  let { closeDialog, formAction, item }: Props = $props();

  const fields: FormField[] = [
    { title: "id", component: IdHiddenInput, defaultValue: null },
    { title: "name", component: TextInput, defaultValue: "", label: "Name",  placeholder: "Enter name" },
    { title: "color", component: ColorInput, label: "Color" }
  ];
</script>

<BaseForm
  {closeDialog}
  {fields}
  {formAction}
  {item}
  itemType="label"
/>
