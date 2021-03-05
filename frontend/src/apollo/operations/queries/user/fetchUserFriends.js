import {gql} from "@apollo/client"

export const FETCH_USER_FRIENDS = gql`
  query{
    fetchUserFriends{
      _id
      name
      slug
      avatar
    }
  }
`