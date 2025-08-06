<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Activity, FormField, Label } from '$lib/types';
  import { BaseForm, DateInput, IdHiddenInput, ImageInput, LabelsInput, NumberInput, TextAreaInput, TextInput } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Activity;
    labels: Label[];
  }

  let { closeDialog, formAction, item, labels }: Props = $props();

  const fields: FormField[] = [
    { title: "id", component: IdHiddenInput, defaultValue: null },
    { title: "name", component: TextInput, defaultValue: "", label: "Name",  placeholder: "Enter name" },
    { title: "labels", component: LabelsInput, defaultValue: [], items: labels?.map((l) => ({ value: l.id, name: l.name, color: l.color })), label: "Labels" },
    { title: "date", component: DateInput, defaultValue: null, label: "Date" },
    { title: "time_valued", component: NumberInput, defaultValue: 0, label: "Valued Time (H)", placeholder: "Enter number", style: "inline-block w-1/2 pr-2" },
    { title: "time_real", component: NumberInput, defaultValue: 0, label: "Real Time (H)", placeholder: "Enter number", style: "inline-block w-1/2 pl-2" },
    { title: "description", component: TextAreaInput, defaultValue: "", label: "Description", placeholder: "Write about the activity..." },
    { title: "image", component: ImageInput, defaultValue: null, label: "Image", required: !item },
    { title: "proof", component: ImageInput, defaultValue: null, label: "Proof", required: !item }
  ];
</script>

<BaseForm
  {closeDialog}
  {fields}
  {formAction}
  {item}
  itemType="activity"
/>
