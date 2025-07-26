<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

  let { item } = $props();
</script>

<ExclamationCircleOutline class="mx-auto w-12 h-12" />
<h3 class="text-center">Are you sure you want to delete <strong class="font-bold">{item.name}</strong> ?</h3>
<div class="flex justify-center gap-4">
  <Button type="submit" value="delete">Delete</Button>
  <Button type="submit" outline autofocus>Cancel</Button>
</div>
