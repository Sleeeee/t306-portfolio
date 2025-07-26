<script lang="ts">
  import { Badge, Button, CloseButton, Datepicker, Fileupload, Input, Label, MultiSelect, Range, Textarea } from 'flowbite-svelte';

  let { item, labels, onclose, onsubmit } = $props();
  const blankActivity = {name: "", labels: [], date: null, time_valued: 0, time_real: 0, description: "", image: null, proof: null};
  const formActivity = $state(item || blankActivity);
  if (item) {
    formActivity.labels = item.labels.map((l) => (l.id));
  }
  const formattedLabels = labels.map((l) => ({
    value: l.id,
    name: l.name,
    color: l.color
  }));
</script>

<div class="flex items-center justify-between mb-4">
  <h5 class="font-bold">
    {(item) ? "Edit" : "Create"} activity
  </h5>
  <CloseButton onclick={onclose} />
</div>

<form {onsubmit}>
  <div class="mb-4">
    <Label>Name</Label>
    <Input bind:value={formActivity.name} placeholder="Enter name" required />
  </div>

  <div class="mb-4">
    <Label>Labels</Label>
    <MultiSelect items={formattedLabels} bind:value={formActivity.labels}>
      {#snippet children({ item, clear })}
        <Badge color={item.color} dismissable params={{ duration: 100 }} onclose={clear}>
          {item.name}
        </Badge>
      {/snippet}
    </MultiSelect>
  </div>

  <div class="mb-4">
    <Label>Date</Label>
    <Datepicker bind:value={formActivity.date} required />
  </div>

  <div class="flex mb-4 gap-4">
    <div>
      <Label>Valued time (H)</Label>
      <Input bind:value={formActivity.time_valued} type="number" min=0 placeholder="Enter number" required />
    </div>
    <div>
      <Label>Real time (H)</Label>
      <Input bind:value={formActivity.time_real} type="number" min=0 placeholder="Enter number" required />
    </div>
  </div>

  <div class="mb-4">
    <Label>Description</Label>
    <Textarea bind:value={formActivity.description} rows=5 placeholder="Write about the activity..." />
  </div>

  <div class="mb-6">
    <Label>Image</Label>
    <Fileupload clearable />
  </div>

  <div class="mb-6">
    <Label>Proof</Label>
    <Fileupload clearable />
  </div>

  <Button type="submit" class="w-full">
    {(item) ? "Edit" : "Create"} activity
  </Button>
</form>
