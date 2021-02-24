import { gql } from "@apollo/client";

export const LOGIN = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      user {
        _id
        name
        email
        password
        createdAt
      }
      token
      tokenExpire
    }
  }
`;
