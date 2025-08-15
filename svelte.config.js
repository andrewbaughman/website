import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { readdirSync } from 'fs';
import { join } from 'path';

// Dynamically generate prerender entries based on blog posts
function getPrerenderEntries() {
    const baseEntries = ['/', '/blog', '/rss'];
    const postsDir = join(process.cwd(), 'src/routes/blog/posts');

    try {
        const postFiles = readdirSync(postsDir, { withFileTypes: true });
        const blogEntries = postFiles
            .filter(file => file.isFile() && file.name.endsWith('.md'))
            .map(file => `/blog/${file.name.replace('.md', '')}`);

        return [...baseEntries, ...blogEntries];
    } catch {
        // If posts directory doesn't exist, return base entries
        return baseEntries;
    }
}

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
			fallback: "200.html"
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/website' : '',
		},
		prerender: {
			entries: getPrerenderEntries(),
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