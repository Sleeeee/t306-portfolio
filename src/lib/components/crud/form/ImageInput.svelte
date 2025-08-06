<script lang="ts">
  import { Fileupload, Label } from 'flowbite-svelte';

  interface Props {
    label: string;
    name: string;
    required: boolean;
  }

  let { label, name, required }: Props = $props();
</script>

<div class="mb-6">
  <Label>{label}</Label>
  <Fileupload {name} accept=".jpeg, .jpg, .png" {required} clearable />
</div>
