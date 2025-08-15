export async function load({ params }) {
    try {
        const post = await import(`../posts/${params.slug}.md`);
        const { title, date } = post.metadata;
        const Content = post.default;

        return {
            Content,
            title,
            date
        };
    } catch {
        // Handle case where post doesn't exist
        throw new Error(`Post not found: ${params.slug}`);
    }
}