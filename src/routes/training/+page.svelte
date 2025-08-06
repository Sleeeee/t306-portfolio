<script lang="ts">
	import type { PageProps } from '$types';
	import { ActivitiesCarousel, ActivitiesModal, Hero } from '$lib';

	let { data }: PageProps = $props();
  let isOpen: boolean = $state(false);
  const openModal = (): void => { isOpen = true; };
</script>

<div class="p-8">
	<Hero
    title="Training"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis vulputate viverra. Etiam sit amet erat at orci laoreet semper a sit amet dui. Mauris."
    onButtonClick={openModal}
  />
  <ActivitiesCarousel activities={data.activities} imageActivities={data.imageActivities} />
  <ActivitiesModal activities={data.activities} bind:isOpen={isOpen} />
</div>
