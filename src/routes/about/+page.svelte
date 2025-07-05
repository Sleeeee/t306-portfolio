<script lang="ts">
	import type { PageProps } from './$types';
	import { Alert } from 'flowbite-svelte';
	import { TechnologiesAccordion } from '$lib';

	let { data }: PageProps = $props();
</script>

<div class="p-8">
	<Alert>
		<span class="font-medium">Info alert!</span>
		You have successfully landed on the about page.
	</Alert>
	<TechnologiesAccordion technologies={data.technologies} />
</div>
