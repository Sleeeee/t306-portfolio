<script lang="ts">
  import type { Degree, FormField } from '$lib/types';
  import { BaseForm, DateInput, IdHiddenInput, TextAreaInput, TextInput } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Degree;
  }

  let { closeDialog, formAction, item }: Props = $props();

  const fields: FormField[] = [
    { title: "id", component: IdHiddenInput, defaultValue: null },
    { title: "degree", component: TextInput, defaultValue: "", label: "Degree", placeholder: "Enter degree name" },
    { title: "institution", component: TextInput, defaultValue: "", label: "Institution", placeholder: "Enter institution name" },
    { title: "location", component: TextInput, defaultValue: "", label: "Location", placeholder: "Enter location" },
    { title: "date_start", component: DateInput, defaultValue: null, label: "Start Date" },
    { title: "date_end", component: DateInput, defaultValue: null, label: "End Date" },
    { title: "description", component: TextAreaInput, defaultValue: "", label: "Description", placeholder: "Write about the degree..." }
  ];
</script>

<BaseForm
  {closeDialog}
  {fields}
  {formAction}
  {item}
  itemType="degree"
/>
