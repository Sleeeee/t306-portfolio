<script lang="ts">
  import { Label, Textarea } from 'flowbite-svelte';

  interface Props {
    label: string;
    name: string;
    placeholder: string;
    value: string;
  }

  let { label, name, placeholder, value = $bindable() }: Props = $props();
</script>

<div class="mb-4">
  <Label>{label}</Label>
  <Textarea bind:value={value} {name} rows=5 {placeholder} required />
</div>
