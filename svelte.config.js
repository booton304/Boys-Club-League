import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-auto'; // Your existing adapter

const config = {
  // Tell Svelte to treat .md files as components
  extensions: [".svelte", ".md"],
  
  preprocess: [
    mdsvex({
      extensions: [".md"]
    })
  ],

  kit: {
    adapter: adapter()
    // Keep your other existing kit settings here
  }
};

export default config;