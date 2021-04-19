import { currentPersonalUserVar } from "../cache";

export const setCurrentPersonalUser = (user) => currentPersonalUserVar(user);

export const addPostItemToCurrentPersonalUser = (post) => {
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser.postsData?.length) {
    currentUser.postsData = [{ ...post }, ...currentUser.postsData];
  } else {
    currentUser.postsData = [{ ...post }];
  }
  return currentPersonalUserVar(currentUser);
};

export const addPostsToCurrentPersonalUser = (posts) => {
  let currentUser = { ...currentPersonalUserVar() };
  if (currentUser.postsData?.length) {
    currentUser.postsData = [...currentUser.postsData, ...posts];
  } else {
    currentUser.postsData = [...posts];
  }
  return currentPersonalUserVar(currentUser);
};

export const updatePostInCurrentPersonalUser = (editedPost) => {
  let currentUser = { ...currentPersonalUserVar() };

  if (currentUser.postsData?.some((post) => post._id === editedPost._id)) {
    const updatedPosts = currentUser.postsData.map((post) => {
      let _post = { ...post };
      if (_post._id === editedPost._id) {
        return { ..._post, ...editedPost };
      }
      return { ..._post };
    });

    return currentPersonalUserVar({ ...currentUser, postsData: updatedPosts });
  }
};
