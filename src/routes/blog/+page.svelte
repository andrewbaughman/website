<script>
    export let data;
</script>

<h1>Blog</h1>
<a href="/rss"> Subscribe via RSS here</a>

<ul>
    {#if data.posts.length > 0}
        {#each data.posts as post}
            <li>
                <h2>
                    <a href="/blog/{post.path}">
                        {post.meta.title}
                    </a>
                </h2>
                Published {post.meta.date}
            </li>
        {/each}
    {:else}
        <p>No posts found</p>
    {/if}
</ul>