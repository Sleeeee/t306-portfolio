<script lang="ts">
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { TechnologyCard } from '$lib';

	let { technologies } = $props();
</script>

<Accordion flush>
	<AccordionItem>
		{#snippet header()}Technologies{/snippet}
		<div class="flex gap-4">
			{#each technologies as technology}
				<TechnologyCard {technology} />
			{/each}
		</div>
	</AccordionItem>
</Accordion>
