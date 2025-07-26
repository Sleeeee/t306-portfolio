<script lang="ts">
  let { item, key } = $props();
</script>

<img src={item[key]} alt={`${key} for ${item.name}`} class="mx-auto rounded-lg" />
