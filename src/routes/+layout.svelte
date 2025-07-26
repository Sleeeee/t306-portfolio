<script lang="ts">
	import '../app.css';
  import { Footer, Navigation } from '$lib';
	let { children } = $props();
	</script>

<Navigation />

<main class="mx-auto w-4/5 font-mono">
	{@render children()}
</main>

<Footer />
