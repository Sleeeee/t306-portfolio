<script lang="ts">
  import { Badge, Button, CloseButton, Fileupload, Input, Label, MultiSelect, Range, Textarea } from 'flowbite-svelte';

  let { item, labels, onclose, onsubmit } = $props();
  const blankTechnology = {name: "", labels: [], mastery: 0, description: "", image: null};
  const formTechnology = $state(item || blankTechnology);
  if (item) {
    formTechnology.labels = item.labels.map((l) => (l.id));
  }
  const formattedLabels = labels.map((l) => ({
    value: l.id,
    name: l.name,
    color: l.color
  }));
</script>

<div class="flex items-center justify-between mb-4">
  <h5 class="font-bold">
    {(item) ? "Edit" : "Create"} technology
  </h5>
  <CloseButton onclick={onclose} />
</div>

<form {onsubmit}>
  <div class="mb-4">
    <Label>Name</Label>
    <Input bind:value={formTechnology.name} placeholder="Enter name" required />
  </div>

  <div class="mb-4">
    <Label>Labels</Label>
    <MultiSelect items={formattedLabels} bind:value={formTechnology.labels}>
      {#snippet children({ item, clear })}
        <Badge color={item.color} dismissable params={{ duration: 100 }} onclose={clear}>
          {item.name}
        </Badge>
      {/snippet}
    </MultiSelect>
  </div>

  <div class="mb-4">
    <Label>Mastery</Label>
    <div class="flex items-center gap-2">
      <Range bind:value={formTechnology.mastery} min="0" max="100" step="5" />
      {formTechnology.mastery}/100
    </div>
  </div>

  <div class="mb-4">
    <Label>Description</Label>
    <Textarea bind:value={formTechnology.description} rows=5 placeholder="Write about the technology..." />
  </div>

  <div class="mb-6">
    <Label>Image</Label>
    <Fileupload clearable />
  </div>

  <Button type="submit" class="w-full">
    {(item) ? "Edit" : "Create"} technology
  </Button>
</form>
