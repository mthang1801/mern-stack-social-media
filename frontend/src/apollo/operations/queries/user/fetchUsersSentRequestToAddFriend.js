import { gql } from "@apollo/client";

export const FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND = gql`
  query($skip: Int, $limit: Int) {
    fetchUsersSentRequestToAddFriend(skip: $skip, limit: $limit) {
      _id
      name
      slug
      avatar
    }
  }
`;
