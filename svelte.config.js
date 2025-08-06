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
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/website' : '',
		},
		prerender: {
			handleHttpError: ({ message, status }) => {
				// Ignore 404 errors for paths that don't begin with base
				if (message.includes('does not begin with `base`')) {
					return;
				}
				// Ignore 500 errors during prerendering (API not available)
				if (status === 500) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;