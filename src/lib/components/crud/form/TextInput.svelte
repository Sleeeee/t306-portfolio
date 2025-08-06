<script lang="ts">
  import { Input, Label } from 'flowbite-svelte';

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
  <Input bind:value={value} {name} {placeholder} required />
</div>
