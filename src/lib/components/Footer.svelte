<script lang="ts">
	import { Footer, FooterCopyright, FooterIcon } from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
</script>

<Footer>
	<FooterCopyright href="/" by="Justin Stas" year={2025} />
	<div class="flex gap-2">
		<FooterIcon href="https://github.com/Sleeeee" target="_blank">
			<GithubSolid
				class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon>
		<FooterIcon href="https://linkedin.com/in/justin-stas-82453a271" target="_blank">
			<LinkedinSolid
				class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon>
	</div>
</Footer>
