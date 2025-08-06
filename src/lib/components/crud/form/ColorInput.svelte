<script lang="ts">
  import { Badge, Label, RadioButton } from 'flowbite-svelte';
  import { validColors } from '$lib/constants';

  interface Props {
    label: string;
    name: string;
    value: string;
  }

  let { label, name, value = $bindable() }: Props = $props();
</script>

<div class="mb-4">
  <Label>{label}</Label>
  <div class="flex flex-wrap justify-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
    {#if value}
      <Badge color={value} class="block w-full mb-2 text-center">{value}</Badge>
    {/if}
    {#each validColors as color}
      <RadioButton {name} bind:group={value} value={color} {color} class={`focus:ring-${color}-400`} checkedClass={`ring-4 ring-${color}-400`} />
    {/each}
  </div>
</div>
