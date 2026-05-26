<script context="module">
  export async function load() {
    // Import all Markdown files from the posts directory
    const allPostFiles = import.meta.glob('/src/posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
      iterablePostFiles.map(async ([path, resolver]) => {
        const { metadata } = await resolver();
        // Remove '/src/posts/' and '.md' to create the URL slug
        const postPath = path.slice(11, -3); 

        return {
          meta: metadata,
          path: postPath,
        };
      })
    );

    return {
      props: {
        posts: allPosts
      }
    };
  }
</script>

<script>
  export let posts;
</script>

<h1>League Blog</h1>
<ul>
  {#each posts as post}
    <li>
      <a href={`/blog/${post.path}`}>{post.meta.title}</a>
      <p>Published on {post.meta.date}</p>
    </li>
  {/each}
</ul>