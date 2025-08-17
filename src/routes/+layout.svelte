<script lang="ts">
	import '../app.css';
  import type { PageProps } from '$types';
  import { Footer, Navigation } from '$lib';

	let { children }: PageProps = $props();
</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-700">
  <Navigation />

  <main class="flex-grow mx-auto w-9/10 md:w-4/5 mt-24 p-0 sm:p-2 md:p-4 lg:p-8 font-mono">
    {@render children()}
  </main>

  <Footer class="self-end" />
</div>
