<script context="module">
  export async function load({ page }) {
    const slug = page.params.slug;
    // Dynamically import the specific Markdown file matching the URL
    const post = await import(`../../posts/${slug}.md`);

    return {
      props: {
        Content: post.default,
        meta: post.metadata
      }
    };
  }
</script>

<script>
  export let Content;
  export let meta;
</script>

<article>
  <h1>{meta.title}</h1>
  <p>Written by {meta.author} on {meta.date}</p>
  
  <hr />
  
  <svelte:component this={Content} />
</article>