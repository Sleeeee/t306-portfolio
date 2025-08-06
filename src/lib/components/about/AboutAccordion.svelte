<script lang="ts">
  import type { Technology } from '$lib/types';
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { TechnologiesGallery } from '$lib';

  interface Props {
    technologies: Technology[];
  }

	let { technologies }: Props = $props();	
</script>

<Accordion flush>	
  <AccordionItem>
    {#snippet header()}Technologies{/snippet}
    <TechnologiesGallery {technologies} />
  </AccordionItem>
</Accordion>
