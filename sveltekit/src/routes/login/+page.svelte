<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import type { ActionResponse } from '$lib/types';
  import { startAuthentication, type PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/browser';
  import { Button } from 'flowbite-svelte';
  import { ArrowLeftToBracketOutline, ArrowRightToBracketOutline, RectangleListOutline } from 'flowbite-svelte-icons';
  import { FeedbackAlert } from '$lib';

  let { data }: PageProps = $props();

  let response: ActionResponse | null = $state(data?.response);
  let optionsString: string | null = $state(data?.options);
  let optionsArray: string[] = $derived(optionsString?.split("."));

  $effect(() => {
    if (optionsString && (optionsArray.length !== 2)) {
      response = { success: false, message: "The \"options\" cookie is invalid" };
    }
  });

  let isAuthenticating: boolean = $state(false);

  const enhanceHandler = async ({ cancel, formData }) => {
    if (optionsArray[0]) {
      isAuthenticating = true;

      const optionsJSON: PublicKeyCredentialRequestOptionsJSON = JSON.parse(optionsArray[0]);
      try {
        const authResponse = await startAuthentication({ optionsJSON });
        formData.append("response", JSON.stringify(authResponse));
      } catch (error) {
        response = { success: false, message: "An error occured while trying to authenticate your passkey" };
        isAuthenticating = false;
        cancel();
      }
    } else {
      response = { success: false, message: "Authentication options could not be fetched yet" };
      isAuthenticating = false;
      cancel();
    }

    return async ({ result }) => {
      response = result.data;
      if (response?.success) { optionsString = null; }
      isAuthenticating = false;
    };
  };
</script>

<div class="flex flex-col justify-center items-center">
  {#if response}
    <FeedbackAlert formResponse={response} />
  {/if}

  <form method="POST" use:enhance={enhanceHandler}>
    <Button size="lg" type="submit" disabled={!optionsString || isAuthenticating} class="gap-2">
      Authenticate
      <ArrowLeftToBracketOutline />
    </Button>
  </form>

  {#if !optionsString}
    <div class="flex gap-4 mt-6">
      <Button href="/logout" size="lg" outline class="gap-2">
        To logout page
        <ArrowRightToBracketOutline />
      </Button>

      <Button href="/admin" size="lg" class="gap-2">
        To admin panel
        <RectangleListOutline />
      </Button>
    </div>
  {/if}
</div>
