export async function load() {
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
    posts: allPosts
  };
}