<script lang="ts">
  import type { Degree, Job, Objective, Section, Technology } from '$lib/types';
  import { Listgroup, ListgroupItem } from 'flowbite-svelte';
  import { FlagSolid, BriefcaseSolid, GraduationCapSolid, LaptopCodeSolid } from 'flowbite-svelte-icons';
	import { EducationTimeline, ExperienceTimeline, ObjectivesTimeline, TechnologiesGallery } from '$lib';

  interface Props {
    degrees: Degree[];
    jobs: Job[];
    objectives: Objective[];
    technologies: Technology[];
  }

	let { degrees, jobs, objectives, technologies }: Props = $props();
  const BASE_OFFSET: number = 112;

  let items: Section[] = $state([
    { name: "Objectives", element: null, Icon: FlagSolid, current: true },
    { name: "Technologies", element: null, Icon: LaptopCodeSolid, current: false },
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
    {@const Icon = item.Icon} 

    <ListgroupItem current={item.current} class="p-0 {item.current ? '' : 'cursor-pointer'}">
      <button 
        type="button"
        onclick={() => navigate(item.element)}
        class="flex items-center justify-center gap-2 w-full h-full px-4 py-2.5 bg-transparent border-none focus:outline-none"
      >
        <Icon class="w-5 h-5" />
        <span class="hidden sm:inline">{item.name}</span>
      </button>
    </ListgroupItem>
  {/each}
</Listgroup>

<div bind:this={items[0].element} class="my-8 p-4 rounded-lg bg-pattern-soft">
  <ObjectivesTimeline {objectives} />
</div>

<div bind:this={items[1].element} class="my-8 p-4 rounded-lg bg-pattern-soft">
  <TechnologiesGallery {technologies} />
</div>

<div bind:this={items[2].element} class="my-8 p-4 rounded-lg bg-pattern-soft">
  <ExperienceTimeline {jobs} />
</div>

<div bind:this={items[3].element} class="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 bg-pattern-soft">
  <EducationTimeline {degrees} />
</div>
