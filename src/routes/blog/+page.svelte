<script>
  export let data;
</script>

<h1>League Blog</h1>
<ul>
  {#each data.posts as post}
    <li>
      <a href={`/blog/${post.path}`}>{post.meta.title}</a>
      <p>Published on {post.meta.date}</p>
    </li>
  {/each}
</ul>