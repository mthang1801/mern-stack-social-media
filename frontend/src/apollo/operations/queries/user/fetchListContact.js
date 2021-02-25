import {gql} from "@apollo/client";

export const FETCH_LIST_CONTACT = gql`
  query {
    fetchListContact{
      sentRequests{
        _id
        name 
        slug
        avatar
      }
      receivedRequests{
        _id
        name
        slug
        avatar
      }
      friends {
        _id
        name
        slug
        avatar
      }
    }
  }
`