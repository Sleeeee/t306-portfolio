import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Explicit adapter-node
    adapter: adapter({ out: "build" }),
    csrf: { trustedOrigins: ["https://z13-1.tanuki-macaroni.ts.net"] }
  }
};

export default config;
