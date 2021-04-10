import { gql } from "@apollo/client";

export const FETCH_PERSONAL_USER = gql`
  query FetchPersonalUser($slug: String!) {
    fetchPersonalUser(slug: $slug) {
      _id
      name
      nickname
      slug
      email
      friends
      notifications
      avatar
      posts       
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
    }
  }
`;
