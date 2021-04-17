import postQueries from "./post.queries";
import postMutations from "./post.mutations";
import postSubscriptions from "./post.subscriptions"
export default {
  FETCH_POSTS : postQueries.FETCH_POSTS,
  FETCH_COMMENT : postQueries.FETCH_COMMENTS,
  FETCH_RESPONSES : postQueries.FETCH_RESPONSES,
  CREATE_POST : postMutations.CREATE_POST,
  CREATE_COMMENT : postMutations.CREATE_COMMENT,
  CREATE_RESPONSE : postMutations.CREATE_RESPONSE,
  EDIT_POST : postMutations.EDIT_POST,
  LIKE_COMMENT : postMutations.LIKE_COMMENT,
  LIKE_POST : postMutations.LIKE_POST,
  LIKE_RESPONSE : postMutations.LIKE_RESPONSE,
  REMOVE_COMMENT : postMutations.REMOVE_COMMENT,
  REMOVE_LIKE_COMMENT : postMutations.REMOVE_LIKE_COMMENT,
  REMOVE_LIKE_POST : postMutations.REMOVE_LIKE_POST,
  REMOVE_LIKE_RESPONSE : postMutations.REMOVE_LIKE_RESPONSE,
  REMOVE_RESPONSE : postMutations.REMOVE_RESPONSE,
  CREATE_COMMENT_SUBSCIPTION : postSubscriptions.CREATE_COMMENT_SUBSCIPTION,
  CREATE_RESPONSE_SUBSCRIPTION : postSubscriptions.CREATE_RESPONSE_SUBSCRIPTION,
  EDIT_POST_SUBSCRIPTION : postSubscriptions.EDIT_POST_SUBSCRIPTION,
  MENTION_USERS_IN_POST_SUBSCRIPTION : postSubscriptions.MENTION_USERS_IN_POST_SUBSCRIPTION
}