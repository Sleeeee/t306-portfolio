<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { Footer, Navigation } from '$lib';
</script>

<Navigation />

<main class="mx-auto w-4/5 font-mono">
	{@render children()}
</main>

<Footer />
