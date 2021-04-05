import { gql } from "@apollo/client";

export const LOGIN = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      user {
        _id
        name
        nickname
        slug
        email
        friends
        notifications
        avatar
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
      }
      token
      tokenExpire
    }
  }
`;
