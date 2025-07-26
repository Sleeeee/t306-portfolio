<script lang="ts">
  import { Badge, Button, CloseButton, Input, Label, RadioButton } from 'flowbite-svelte';

  let { item, onclose, onsubmit } = $props();
  const blankLabel = {name: "", color: ""};
  const formLabel = $state(item || blankLabel);

  const colors = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
</script>

<div class="flex items-center justify-between mb-4">
  <h5 class="font-bold">
    {(item) ? "Edit" : "Create"} label
  </h5>
  <CloseButton onclick={onclose} />
</div>

<form {onsubmit}>
  <div class="mb-4">
    <Label>Name</Label>
    <Input bind:value={formLabel.name} placeholder="Enter name" required />
  </div>

  <div class="mb-4">
    <Label>Color</Label>
    <div class="flex flex-wrap justify-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
      {#if formLabel.color}
        <Badge color={formLabel.color} class="block w-full mb-2 text-center">{formLabel.color}</Badge>
      {/if}
      {#each colors as color}
        <RadioButton name="color" bind:group={formLabel.color} value={color} color={color} class={`focus:ring-${color}-400`} checkedClass={`ring-4 ring-${color}-400`} />
      {/each}
    </div>
  </div>

  <Button type="submit" class="w-full">
    {(item) ? "Edit" : "Create"} label
  </Button>
</form>
