<script lang="ts">
  import { page } from "$app/state";
  import type { NavigationPage } from '$ib/types';
	import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';

  let activeUrl = $derived(page.url.pathname);

  const pages: NavigationPage[] = [
    { title: "/home", href: "/" },
    { title: "/about", href: "/about" },
    { title: "/training", href: "/training" },
    { title: "/contact", href: "/contact" },
    { title: "/admin", href: "/admin", hidden: true }
  ];
</script>

<div class="relative">
  <Navbar class="fixed start-0 top-0 z-50 bg-pattern-soft font-mono">
    <NavBrand href="/" class="p-4 backdrop-blur-sm bg-white/5 rounded-lg">
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white hover:text-primary-700 dark:hover:text-primary-500">Justin Stas</span>
    </NavBrand>

    <div class="flex items-center md:order-2 p-4 backdrop-blur-sm bg-white/5 rounded-lg">
      <DarkMode class="hover:text-primary-700 dark:hover:text-primary-500" />
      <NavHamburger />
    </div>

    <NavUl {activeUrl} class="order-1 backdrop-blur-sm bg-white/5 rounded-lg">
      {#each pages as page}
        <NavLi href={page.href} class="dark:hover:text-primary-500!" activeClass="text-primary-700 dark:text-primary-500">{page.title}</NavLi>
      {/each}
    </NavUl>
  </Navbar>
</div>
