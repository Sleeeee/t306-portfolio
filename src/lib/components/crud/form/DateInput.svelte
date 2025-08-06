<script lang="ts">
  import { Datepicker, Label } from 'flowbite-svelte';

  interface Props {
    label: string;
    name: string;
    value: string;
  }

  let { label, name, value = $bindable() }: Props = $props();
</script>

<div class="mb-4">
  <Label>{label}</Label>
  <Datepicker bind:value={value} required />

  <!-- The name attribute does not get passed down to the Datepicker, so I am forced to use a hidden input to send the data to the server -->
  <input type="hidden" {name} {value} />
</div>
