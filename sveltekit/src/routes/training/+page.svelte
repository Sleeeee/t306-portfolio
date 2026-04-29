<script lang="ts">
  import type { PageProps } from '$types';
  import type { ButtonConfig } from '$lib/types';
  import { RectangleListOutline } from 'flowbite-svelte-icons';
  import { ActivitiesCarousel, ActivitiesModal, CarouselSkeleton, Hero } from '$lib';
  import { trainingDescription } from '$lib/constants';

  let { data }: PageProps = $props();

  let isOpen: boolean = $state(false);
  const openModal = (): void => { isOpen = true; };

  const button: ButtonConfig = { icon: RectangleListOutline, onclick: openModal, text: "View summary" };
</script>

<Hero
  imageLight="/avatar_training_light.png"
  imageDark="/avatar_training_dark.png"
  title="Training"
  description={trainingDescription}
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
