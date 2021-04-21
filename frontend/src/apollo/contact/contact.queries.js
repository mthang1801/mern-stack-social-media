import {gql} from "@apollo/client";

export const FETCH_LIST_CONTACT = gql`
query {
  fetchListContact{
    sentRequests{
      _id
      name 
      slug
      avatar
      email
    }
    receivedRequests{
      _id
      name
      slug
      avatar
      email
    }
    friends {
      _id
      name
      slug
      email
      avatar
      isOnline
      offlinedAt
    }
  }
}
`


export const FETCH_USER_FRIENDS_DATA = gql`
  query FetchUserFriends($skip: Int, $limit: Int, $userId: ID) {
    fetchFriends(skip: $skip, limit: $limit, userId: $userId) {
      _id
      name
      slug
      email
      avatar
      isOnline
      offlinedAt
      createdAt
    }
  }
`;
