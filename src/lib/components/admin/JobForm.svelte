<script lang="ts">
  import type { FormField, Job } from '$lib/types';
  import { BaseForm, DateInput, IdHiddenInput, TextAreaInput, TextInput } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Job;
  }

  let { closeDialog, formAction, item }: Props = $props();

  const fields: FormField[] = [
    { title: "id", component: IdHiddenInput, defaultValue: null },
    { title: "position", component: TextInput, defaultValue: "", label: "Position", placeholder: "Enter position name" },
    { title: "company", component: TextInput, defaultValue: "", label: "Company", placeholder: "Enter company name" },
    { title: "location", component: TextInput, defaultValue: "", label: "Location", placeholder: "Enter location" },
    { title: "date_start", component: DateInput, defaultValue: null, label: "Start Date" },
    { title: "date_end", component: DateInput, defaultValue: null, label: "End Date" },
    { title: "description", component: TextAreaInput, defaultValue: "", label: "Description", placeholder: "Write about the job..." }
  ];
</script>

<BaseForm
  {closeDialog}
  {fields}
  {formAction}
  {item}
  itemType="job"
/>
