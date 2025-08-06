<script lang="ts">
	import '../app.css';
  import type { PageProps } from '$types';
  import { Footer, Navigation } from '$lib';

	let { children }: PageProps = $props();
</script>

<Navigation />

<main class="mx-auto w-4/5 font-mono">
	{@render children()}
</main>

<Footer />
