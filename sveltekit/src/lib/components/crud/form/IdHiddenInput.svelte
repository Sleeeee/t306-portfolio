<script lang="ts">
  interface Props {
    name: string;
    value: string;
  }

 let { name, value }: Props = $props();
</script>

{#if value}
  <input type="hidden" {name} {value} />
{/if}
