export async function load({ params }) {
  const slug = params.slug;
  const post = await import(`../../../posts/${slug}.md`);

  return {
    Content: post.default,
    meta: post.metadata
  };
}