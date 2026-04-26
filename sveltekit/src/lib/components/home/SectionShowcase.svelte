<script lang="ts">
  import type { Component } from 'svelte';
  import { Avatar, Button, Listgroup, Sidebar, SidebarGroup, SidebarItem } from 'flowbite-svelte';
  import { ArrowRightOutline, PlayOutline, PauseOutline } from 'flowbite-svelte-icons';
  import { fly } from 'svelte/transition';

  const items = $state([
    { name: "/about", src: "/favicon.png", title: "About me", current: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur  lacus eu vehicula tempor. Aliquam feugiat dui in nisi vulputate aliquet." },
    { name: "/training", src: "/favicon.png", title: "Training", current: false, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur  lacus eu vehicula tempor. Aliquam feugiat dui in nisi vulputate aliquet." },
    { name: "/contact", src: "/favicon.png", title: "Contact me", current: false, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur  lacus eu vehicula tempor. Aliquam feugiat dui in nisi vulputate aliquet." }
  ]);

  let animation: boolean = $state(true);
  let activeIndex: number = $state(0);
  let intervalId: number | null = $state(null);
  let pauseId: number | null = $state(null);

  const setCurrent = (index: number): void => {
    items.forEach((item, i) => item.current = i === index );
  };
  $effect(() => { setCurrent(activeIndex); });

  const startSlideshow = (): void => {
    intervalId = setInterval(() => {
      activeIndex = (activeIndex + 1) % items.length;
    }, 5000);
  };

  const toggleAnimation = (): void => {
    if (intervalId) { clearInterval(intervalId); }
    if (pauseId) { clearTimeout(pauseId); }

    animation = !animation;
    if (animation) {
      startSlideshow();
    }
  }

  const showcaseSection = (event): void => {
    const index: number = items.findIndex(item => item.name === event.target.innerText);
    if (index < 0) return;
    activeIndex = index;

    if (animation) {
      // Stop the slideshow for 10 seconds, refresh if pause was active
      if (intervalId) { clearInterval(intervalId); }
      if (pauseId) { clearTimeout(pauseId); }
      pauseId = setTimeout(startSlideshow, 10000);
    }
  };

  // Ensure horizontal Listgroup orientation at the sm breakpoint
  let innerWidth: number = $state(0);
  let horizontal: boolean = $derived(innerWidth >= 640);

  startSlideshow();
</script>

<svelte:window bind:innerWidth />

<div class="relative my-8 p-4 w-full min-h-[500px] bg-pattern-soft text-gray-800 dark:text-white text-center rounded-lg">
  {#key activeIndex}
    <div in:fly={{ x: 300, duration: 500 }} out:fly={{ x:-300, duration: 500 }} class="absolute flex flex-col justify-center inset-0 w-full mx-auto p-0">

      <div class="w-2/3 mx-auto p-4 backdrop-blur-sm bg-white/5 rounded-lg">
      <div class="flex flex-col md:flex-row justify-around items-center w-1/2 mx-auto mb-8">
        <Avatar src={items[activeIndex].src} size="xl" class="" />
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold">{items[activeIndex].title}</h2>
      </div>

      <p class="max-w-full sm:max-w-2/3 lg:max-w-1/2 mx-auto mb-8 p-1 text-sm sm:text-base">{items[activeIndex].description}</p>

      <Button href={items[activeIndex].name} size="lg"  class="mx-auto gap-2">View more <ArrowRightOutline /></Button>
      </div>
    </div>
  {/key}
</div>

<div class="flex flex-col md:flex-row justify-between items-center w-full mx-auto gap-4">
  <Listgroup {items} onclick={showcaseSection} active {horizontal} class="max-w-full sm:max-w-2/3 lg:max-w-1/2 mx-auto whitespace-nowrap" />

  <Button onclick={toggleAnimation} outline class="mx-auto gap-2 cursor-pointer">
    {@const Icon = animation ? PauseOutline : PlayOutline}
    <Icon />
    Animation
  </Button>
</div>
