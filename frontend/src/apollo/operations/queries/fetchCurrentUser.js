import { gql } from "@apollo/client";

export const FETCH_CURRENT_USER = gql`
  query{
    fetchCurrentUser {
      _id
      name
      email      
      avatar      
    }
  }
`;
