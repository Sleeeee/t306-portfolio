<script lang="ts">
  import type { ButtonConfig } from '$lib/types';
  import { Button } from 'flowbite-svelte';
  import { EnvelopeSolid, GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';

  const items: ButtonConfig[] = [
    { href: "https://github.com/Sleeeee", icon: GithubSolid, text: "Have a look at my GitHub projects !" },
    { href: "https://linkedin.com/in/justin-stas-82453a271", icon: LinkedinSolid, text: "Reach out on LinkedIn !" },
    { href: "mailto:jstasjustin@gmail.com", icon: EnvelopeSolid, text: "For further inquiry, send me an email !" }
  ];

  let displayedText: string = $state(""); 
  let intervalId: number | null = $state(null);

  const displayText = (index: number): void => {
    const referenceText = items[index].text;
    let i: number = 0;
    if (intervalId) {
      clearInterval(intervalId);
      displayedText = "";
    }

    intervalId = setInterval(() => {
      displayedText += referenceText[i++];
      if (displayedText.length === referenceText.length) { clearInterval(intervalId); }
    }, 25);
  };
  const eraseText = (): void => {
    if (intervalId) { clearInterval(intervalId); }

    intervalId = setInterval(() => {
      if (!displayedText) { clearInterval(intervalId); }
      displayedText = displayedText.slice(0, -1);
    }, 25);
  };
</script>

<div class="flex justify-around w-1/2 my-8 mx-auto">
  {#each items as item, i}
    <Button href={item.href} target="_blank" onmouseenter={() => { displayText(i); }} onmouseleave={eraseText} pill class="p-4">
      {@const Icon = item.icon}
      <Icon class="h-16 w-16 dark:text-gray-700 hover:text-gray-200" />
    </Button>
  {/each}
</div>

<p class="text-center text-2xl dark:text-white">{displayedText}</p>
