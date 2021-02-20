const setPersonalPosts = (setPersonalPostsVar) => (userId, posts) =>
  setPersonalPostsVar({ ...setPersonalPostsVar(), [userId]: [...posts] });

export default setPersonalPosts;
