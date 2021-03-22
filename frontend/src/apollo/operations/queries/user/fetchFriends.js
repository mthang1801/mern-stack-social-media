import {gql} from "@apollo/client"

export const FETCH_FRIENDS = gql`
  query ($skip : Int, $limit : Int, $userId: ID){
    fetchFriends(skip : $skip, limit : $limit, userId: $userId){
      _id
      name
      slug
      avatar
      isOnline 
      offlinedAt
      createdAt
    }
  }
`