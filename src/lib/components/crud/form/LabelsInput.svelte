<script lang="ts">
  import type { Label } from '$lib/types';
  import { Badge, Label as FormLabel, MultiSelect } from 'flowbite-svelte';

  interface Props {
    items: Label[];
    name: string;
    value: string[];
  }

  let { items, name, value = $bindable() }: Props = $props();
</script>

<div class="mb-4">
  <FormLabel>Labels</FormLabel>
  <MultiSelect {items} bind:value={value} {name}>
    {#snippet children({ item, clear })}
      <Badge color={item.color} dismissable params={{ duration: 100 }} onclose={clear}>
        {item.name}
      </Badge>
    {/snippet}
  </MultiSelect>
</div>
