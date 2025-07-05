<script lang="ts">
	import { Card } from 'flowbite-svelte';

	let { technology } = $props();
</script>

<div class="space-y-4">
	<Card img="/favicon.png">
		<div class="m-6">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{technology.name}
			</h5>
			<p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">
				{technology.description}
			</p>
		</div>
	</Card>
</div>
