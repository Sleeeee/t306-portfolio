<script lang="ts">
  import type { PageProps } from './$types';
  import { AdminTabs, Hero } from '$lib';

  let { data }: PageProps = $props();
</script>

<div class="p-8">
	<Hero title="Admin panel" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet arcu finibus, varius augue ac." />
  <AdminTabs activities={data.activities} labels={data.labels} technologies={data.technologies} />
</div>
