<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
</script>

<Navbar class="font-mono">
	<NavBrand href="/">
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span
		>
	</NavBrand>
	<div class="flex md:order-2">
		<NavUl>
			<NavLi href="https://github.com/Sleeeee" target="_blank">
				<GithubSolid class="h-10 w-10" />
			</NavLi>
			<NavLi href="https://linkedin.com/in/justin-stas-82453a271" target="_blank">
				<LinkedinSolid class="h-10 w-10" />
			</NavLi>
		</NavUl>
		<NavHamburger />
	</div>
	<NavUl class="order-1">
		<NavLi href="/">/home</NavLi>
		<NavLi href="/about">/about</NavLi>
		<NavLi href="/training">/training</NavLi>
		<NavLi href="/contact">/contact</NavLi>
		<NavLi href="/admin">/admin</NavLi>
	</NavUl>
</Navbar>
