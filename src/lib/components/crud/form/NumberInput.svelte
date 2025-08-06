<script lang="ts">
  import { Input, Label } from 'flowbite-svelte';

  interface Props {
    label: string;
    name: string;
    placeholder: string;
    style: string;
    value: string;
  }

  let { label, name, placeholder, style = "", value = $bindable() }: Props = $props();
</script>

<div class={`mb-4 ${style}`}>
  <Label>{label}</Label>
  <Input bind:value={value} {name} type="number" min=0 {placeholder} required />
</div>
