<script lang="ts">
  import type { Section, Technology } from '$lib/types';
  import { Listgroup, ListgroupItem } from 'flowbite-svelte';
  import { BriefcaseSolid, GraduationCapSolid, LaptopCodeSolid } from 'flowbite-svelte-icons';
	import { EducationTimeline, ExperienceTimeline, TechnologiesGallery } from '$lib';

  interface Props {
    technologies: Technology[];
  }

	let { degrees, jobs, technologies }: Props = $props();
  const BASE_OFFSET: number = 112;

  let items: Section[] = $state([
    { name: "Technologies", element: null, Icon: LaptopCodeSolid, current: true },
    { name: "Experience", element: null, Icon: BriefcaseSolid, current: false },
    { name: "Education", element: null, Icon: GraduationCapSolid, current: false }
  ]);

  const setCurrent = (detail: Section): void => {
    items.forEach(item => item.current = item.name === detail.name);
  };

  const navigate = (element: HTMLElement): void => {
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

<Listgroup active horizontal class="sticky top-16 md:top-23 mb-8 z-10">
  {#each items as item}
    <ListgroupItem current={item.current} onclick={() => { navigate(item.element) }} class="justify-center">
      {@const Icon = item.Icon}
      <Icon />
      <p class="hidden sm:block">{item.name}</p>
    </ListgroupItem>
  {/each}
</Listgroup>

<div bind:this={items[0].element} class="my-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
  <TechnologiesGallery {technologies} />
</div>

<div bind:this={items[1].element} class="my-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
  <ExperienceTimeline {jobs} />
</div>

<div bind:this={items[2].element} class="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
  <EducationTimeline {degrees} />
</div>
