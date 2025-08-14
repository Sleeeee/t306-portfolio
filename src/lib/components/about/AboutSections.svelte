<script lang="ts">
  import type { Section, Technology } from '$lib/types';
  import { Listgroup } from 'flowbite-svelte';
	import { EducationTimeline, ExperienceTimeline, TechnologiesGallery } from '$lib';

  interface Props {
    technologies: Technology[];
  }

	let { technologies }: Props = $props();
  const BASE_OFFSET: number = 112;

  let items: Section[] = $state([
    { name: "Technologies", element: null, current: true },
    { name: "Experience", element: null, current: false },
    { name: "Education", element: null, current: false }
  ]);

  const setCurrent = (detail: Section): void => {
    items.forEach(item => item.current = item.name === detail.name);
  };

  const navigate = (event): void => {
    const element: HTMLElement = event.detail.element;
    const offset: number = element?.offsetTop - BASE_OFFSET || 0;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handleScroll = (): void => {
    const scroll: number = window.scrollY;
    for (let i = items.length -1; i >= 0; i--) {
      if (items[i].element) {
        const offset = items[i].element.offsetTop - BASE_OFFSET - 5; // 5 pixels off ensures autoscroll triggers setCurrent()
        if (scroll > offset) {
          setCurrent(items[i]);
          break;
        }
      }
    }
  };
</script>

<svelte:window onscroll={handleScroll} />

<Listgroup {items} onclick={navigate} active horizontal class="sticky top-12 mb-8" />

<div bind:this={items[0].element} class="my-8 p-4 bg-gray-50 dark:bg-gray-800">
  <TechnologiesGallery {technologies} />
</div>

<div bind:this={items[1].element} class="my-8 p-4 bg-gray-50 dark:bg-gray-800">
  <ExperienceTimeline />
</div>

<div bind:this={items[2].element} class="my-8 p-4 bg-gray-50 dark:bg-gray-800">
  <EducationTimeline />
</div>
