<script lang="ts">
	import type { PageProps } from './$types';
	import { Hero, AboutAccordion } from '$lib';

	let { data }: PageProps = $props();
</script>

<div class="p-8">
	<Hero title="About me" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis libero viverra, fermentum odio nec, sodales ipsum. Morbi." />
	<AboutAccordion technologies={data.technologies} />
</div>
