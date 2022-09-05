export const LoadPosts = async () => {
  const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postResponse, photoResponse]);

  const postJson = await posts.json();
  const photoJson = await photos.json();

  const PostAndPhoto = postJson.map((post, index) => {
    return { ...post, cover: photoJson[index].url };
  });
  return PostAndPhoto;
};
