import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/website' : '',
		}
	}
};

export default config;