<script>
  export let data;
</script>

<article>
  <h1>{data.meta.title}</h1>
  <p>Written by {data.meta.author} on {data.meta.date}</p>
  
  <hr />
  
  <svelte:component this={data.Content} />
</article>