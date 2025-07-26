<script lang="ts">
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { TechnologiesGallery } from '$lib';

	let { technologies } = $props();	
</script>

<Accordion flush>	
  <AccordionItem>
    {#snippet header()}Technologies{/snippet}
    <TechnologiesGallery {technologies} />
  </AccordionItem>
</Accordion>
