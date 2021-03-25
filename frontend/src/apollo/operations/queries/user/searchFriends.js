import { gql } from "@apollo/client";

export const SEARCH_FRIENDS = gql`
  query($search: String!) {
    searchFriends(search: $search) {
      _id
      name
      avatar
      slug
    }
  }
`;
