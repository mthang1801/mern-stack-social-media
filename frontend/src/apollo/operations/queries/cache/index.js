
import { GET_POST_STATUS } from "./post/getPostStatus";
import { GET_POSTS } from "./post/getPosts";
import { GET_CURRENT_PERSONAL_USER } from "./user/getCurrentPersonalUser";
import { GET_PERSONAL_POSTS } from "./post/getPersonalPosts";
import { GET_OPEN_FRIENDS_LIST } from "./friends/getOpenFriendsList";
import { GET_FRIENDS } from "./friends/getFriends";
import { GET_SENT_REQUESTS_TO_ADD_FRIEND } from "./friends/getSentRequestsToAddFriend";
import { GET_RECEIVED_REQUESTS_TO_ADD_FRIEND } from "./friends/getReceivedRequestsToAddFriend";
import { GET_CURRENT_CHAT } from "./chat/getCurrentChat";
import { GET_MESSAGES_STORAGE } from "./messagesStorage/getMessagesStorage";
import { GET_NUMBER_OF_CONVERSATIONS } from "./chat/getNumberOfConversations";
import { GET_CONTACT_CACHE_DATA } from "./contact/getContact";
import { GET_HOME_CACHE_DATA } from "./pages/getHome";
import { GET_NOTIFICATIONS_CACHE_DATA } from "./components/getNotifications";
import { GET_HEADER_CACHE_DATA } from "./components/getHeader";
import { GET_USE_POST_SUBSCRIPTION_CACHE_DATA } from "./components/getUsePostsSubscription";
import { GET_PERSONAL_USER_CACHE_DATA } from "./components/getPersonalUser";

export { GET_POST_STATUS };
export { GET_POSTS };
export { GET_CURRENT_PERSONAL_USER };
export { GET_PERSONAL_POSTS };
export { GET_OPEN_FRIENDS_LIST };
export { GET_FRIENDS };
export { GET_SENT_REQUESTS_TO_ADD_FRIEND };
export { GET_RECEIVED_REQUESTS_TO_ADD_FRIEND };
export { GET_CURRENT_CHAT };
export { GET_MESSAGES_STORAGE };
export { GET_NUMBER_OF_CONVERSATIONS };
export { GET_CONTACT_CACHE_DATA };
export { GET_HOME_CACHE_DATA };
export { GET_NOTIFICATIONS_CACHE_DATA };
export { GET_HEADER_CACHE_DATA };
export { GET_USE_POST_SUBSCRIPTION_CACHE_DATA };
export { GET_PERSONAL_USER_CACHE_DATA };

export const cacheQueries = {    
  GET_POST_STATUS,
  GET_POSTS,
  GET_CURRENT_PERSONAL_USER,
  GET_PERSONAL_POSTS,
  GET_OPEN_FRIENDS_LIST,
  GET_FRIENDS,
  GET_SENT_REQUESTS_TO_ADD_FRIEND,
  GET_RECEIVED_REQUESTS_TO_ADD_FRIEND,
  GET_CURRENT_CHAT,
  GET_MESSAGES_STORAGE,
  GET_NUMBER_OF_CONVERSATIONS,
  GET_CONTACT_CACHE_DATA,
  GET_HOME_CACHE_DATA,
  GET_NOTIFICATIONS_CACHE_DATA,
  GET_HEADER_CACHE_DATA,
  GET_USE_POST_SUBSCRIPTION_CACHE_DATA,
  GET_PERSONAL_USER_CACHE_DATA
};
