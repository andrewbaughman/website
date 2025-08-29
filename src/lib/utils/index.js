export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/src/routes/blog/posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            try {
                const resolved = await resolver();
                // Handle both metadata and default export patterns
                const metadata = resolved?.metadata || resolved?.default?.metadata || {};
                // Extract slug from the full source path
                const postPath = path.replace('/src/routes/blog/posts/', '').replace('.md', '');

                // Try to get the body/content from the resolved module
                const body = resolved?.default?.render
                    ? resolved.default.render().html // SvelteKit markdown uses .render().html
                    : resolved?.body || ''; // fallback if structure is different

                return {
                    meta: metadata,
                    path: postPath,
                    body
                };
            } catch (error) {
                console.error(`Error processing post at ${path}:`, error);
                return null;
            }
        })
    );

    // Filter out any failed posts
    return allPosts.filter(post => post !== null);
};