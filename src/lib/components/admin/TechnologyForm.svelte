<script lang="ts">
  import type { FormField, Label, Technology } from '$lib/types';
  import { BaseForm, IdHiddenInput, ImageInput, LabelsInput, RangeInput, TextAreaInput, TextInput } from '$lib';

  interface Props {
    closeDialog: () => void;
    formAction: string;
    item: Technology;
    labels: Label[];
  }

  let { closeDialog, formAction, item, labels }: Props = $props();

  const fields: FormField[] = [
    { title: "id", component: IdHiddenInput, defaultValue: null },
    { title: "name", component: TextInput, defaultValue: "", label: "Name",  placeholder: "Enter name" },
    { title: "labels", component: LabelsInput, defaultValue: [], items: labels?.map((l) => ({ value: l.id, name: l.name, color: l.color })), label: "Labels" },
    { title: "mastery", component: RangeInput, defaultValue: 0, label: "Mastery" },
    { title: "description", component: TextAreaInput, defaultValue: "", label: "Description", placeholder: "Write about the technology..." },
    { title: "image", component: ImageInput, defaultValue: null, label: "Image", required: !item }
  ];
</script>

<BaseForm
  {closeDialog}
  {fields}
  {formAction}
  {item}
  itemType="technology"
/>
