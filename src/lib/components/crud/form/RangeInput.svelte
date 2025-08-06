<script lang="ts">
  import { Label, Range } from 'flowbite-svelte';

  interface Props {
    label: string;
    name: string;
    value: string;
  }

  let { label, name, value = $bindable() }: Props = $props();
</script>

<div class="mb-4">
  <Label>{label}</Label>
  <div class="flex items-center gap-2">
    <Range bind:value={value} {name} min="0" max="100" step="5" required />
    {value}/100
  </div>
</div>
