export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/src/routes/blog/posts/*.md', { as: 'raw' });
    const iterablePostFiles = Object.entries(allPostFiles);
    const { marked } = await import('marked');

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            try {
                const rawMarkdown = await resolver();
                // Extract frontmatter (metadata) if present
                const frontmatterMatch = rawMarkdown.match(/^---([\s\S]*?)---/);
                let metadata = {};
                let markdownBody = rawMarkdown;
                if (frontmatterMatch) {
                    const yaml = frontmatterMatch[1];
                    markdownBody = rawMarkdown.slice(frontmatterMatch[0].length);
                    // Simple YAML frontmatter parser
                    yaml.split('\n').forEach(line => {
                        const [key, ...rest] = line.split(':');
                        if (key && rest.length) metadata[key.trim()] = rest.join(':').trim();
                    });
                }
                const postPath = path.replace('/src/routes/blog/posts/', '').replace('.md', '');
                const body = marked.parse(markdownBody);
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
    return allPosts.filter(post => post !== null);
};