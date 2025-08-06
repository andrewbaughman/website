export const load = async ({ fetch }) => {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();

        return {
            posts
        }
    } catch {
        // Return empty posts array if API call fails (e.g., during prerendering)
        return {
            posts: []
        }
    }
}