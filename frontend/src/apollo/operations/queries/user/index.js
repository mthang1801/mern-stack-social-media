import { LOGIN } from "./login";
import { FETCH_CURRENT_USER } from "./fetchCurrentUser";
import { FETCH_PERSONAL_USER } from "./fetchPersonalUser";
import { FETCH_FRIENDS } from "./fetchFriends";
import { FETCH_LIST_CONTACT } from "./fetchListContact";
import { FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND } from "./fetchUsersSentRequestToAddFriend";
import { FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND } from "./fetchUsersReceivedRequestToAddFriend";
import { SEARCH_FRIENDS } from "./searchFriends";

export { LOGIN };
export { FETCH_CURRENT_USER };
export { FETCH_PERSONAL_USER };
export { FETCH_FRIENDS };
export { FETCH_LIST_CONTACT };
export { FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND };
export { FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND };
export { SEARCH_FRIENDS };

export const userQueries = {
  LOGIN,
  FETCH_CURRENT_USER,
  FETCH_PERSONAL_USER,
  FETCH_FRIENDS,
  FETCH_LIST_CONTACT,
  FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND,
  FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND,
  SEARCH_FRIENDS,
};
