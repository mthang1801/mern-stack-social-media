import { LOGIN } from "./login";
import { FETCH_CURRENT_USER } from "./fetchCurrentUser";
import { FETCH_PERSONAL_USER } from "./fetchPersonalUser";
import { FETCH_FRIENDS } from "./fetchFriends";

export { LOGIN };
export { FETCH_CURRENT_USER };
export { FETCH_PERSONAL_USER };
export { FETCH_FRIENDS };

export const userQueries = {
  LOGIN,
  FETCH_CURRENT_USER,
  FETCH_PERSONAL_USER,
  FETCH_FRIENDS,
};
