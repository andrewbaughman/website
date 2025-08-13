export const prerender = false;

export async function load({ params }) {
    const post = await import(`../posts/${params.slug}.md`);
    const { title, date } = post.metadata;
    const Content = post.default;

    return {
        Content,
        title,
        date
    };
}