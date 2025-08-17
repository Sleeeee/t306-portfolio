<script lang="ts">
	import type { PageProps } from '$types';
  import type { ButtonConfig } from '$lib/types';
  import { RectangleListOutline } from 'flowbite-svelte-icons';
	import { ActivitiesCarousel, ActivitiesModal, CarouselSkeleton, Hero } from '$lib';

	let { data }: PageProps = $props();

  let isOpen: boolean = $state(false);
  const openModal = (): void => { isOpen = true; };

  const button: ButtonConfig = { icon: RectangleListOutline, onclick: openModal, text: "View summary" };
</script>

<Hero
  image="/favicon.png"
  title="Training"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis vulputate viverra. Etiam sit amet erat at orci laoreet semper a sit amet dui. Mauris."
  {button}
/>

{#await data.activities}
  <CarouselSkeleton />
{:then activities}
  <ActivitiesCarousel {activities} />
  <ActivitiesModal {activities} bind:isOpen={isOpen} />
{:catch error}
  <p class="text-red-800">Error fetching activities: {error}</p>
{/await}
