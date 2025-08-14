<script lang="ts">
  import { page } from '$app/state';

  const errors = {
    404: { message: "Unfortunately, we cannot find the resource you are looking for. It's either hiding really well or never existed." },
    500: { message: "The server is having a tough time processing your request. It's probably writing a ticket right now." },
    default: { message: "An unknown error occured. What is going on ? Even our error handler is confused." }
  }
</script>

<div class="w-1/2 mx-auto my-8 text-center dark:text-white">
  <h1 class="text-4xl font-bold">{page.status}</h1>
  <p class="text-2xl">{page.error.message}</p>
  <p class="text-lg">
    {#if errors[page.status]}
      {errors[page.status]?.message}
    {:else}
      {errors.default.message}
    {/if}
  </p>
</div>
