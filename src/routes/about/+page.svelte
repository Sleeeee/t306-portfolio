<script lang="ts">
	import type { PageProps } from './$types';
  import type { ButtonConfig } from '$lib/types';
  import { ProfileCardOutline } from 'flowbite-svelte-icons';
	import { AboutSections, Hero } from '$lib';

	let { data }: PageProps = $props();

  const button: ButtonConfig = { icon: ProfileCardOutline, href: "/favicon.png", text: "View full résumé" };
</script>

<div class="p-8">
	<Hero
    image="/favicon.png"
    title="About me"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis libero viverra, fermentum odio nec, sodales ipsum. Morbi."
    {button}
  />

  <AboutSections technologies={data.technologies} />
</div>
