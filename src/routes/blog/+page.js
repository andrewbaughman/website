import { fetchMarkdownPosts } from "$lib/utils";

export const load = async () => {
    try {
        console.log('Loading posts...');
        const posts = await fetchMarkdownPosts();
        console.log('Posts loaded:', posts);
        return {
            posts
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        // Return empty posts array if loading fails
        return {
            posts: []
        }
    }
}