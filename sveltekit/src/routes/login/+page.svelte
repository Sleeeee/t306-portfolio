<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import type { ActionResponse } from '$lib/types';
  import { startAuthentication, type PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/browser';
  import { Button } from 'flowbite-svelte';
  import { ArrowLeftToBracketOutline, ArrowRightToBracketOutline, RectangleListOutline } from 'flowbite-svelte-icons';
  import { FeedbackAlert } from '$lib';

  let { data }: PageProps = $props();

  function initResponse() { return data?.response; }
  function initOptions() { return data?.options; }

  let response: ActionResponse | null = $state(initResponse());
  let optionsJSON: string | null = $state(initOptions());

  let isAuthenticating: boolean = $state(false);

  const enhanceHandler = async ({ cancel, formData }) => {
    if (optionsJSON) {
      isAuthenticating = true;

      try {
        const authResponse = await startAuthentication({ optionsJSON });
        formData.append("response", JSON.stringify(authResponse));
      } catch (error) {
        console.error(error);
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
      if (response?.success) { optionsJSON = null; }
      isAuthenticating = false;
    };
  };
</script>

<div class="flex flex-col justify-center items-center">
  {#if response}
    <FeedbackAlert formResponse={response} />
  {/if}

  <form method="POST" use:enhance={enhanceHandler}>
    <Button size="lg" type="submit" disabled={!optionsJSON || isAuthenticating} class="gap-2">
      Authenticate
      <ArrowLeftToBracketOutline />
    </Button>
  </form>

  {#if !optionsJSON}
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
