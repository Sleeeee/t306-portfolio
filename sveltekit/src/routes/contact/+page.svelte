<script lang="ts">
  import { ContactButtons, Hero } from '$lib';
  import { contactDescription } from '$lib/constants';
</script>

<Hero
  imageLight="/avatar_contact_light.png"
  imageDark="/avatar_contact_dark.png"
  title="Contact me"
  description={contactDescription}
/>

<ContactButtons />
