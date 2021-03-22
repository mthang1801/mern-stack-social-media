import {gql} from "@apollo/client";

export const FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND = gql`
  query ($skip : Int, $limit : Int){
    fetchUsersReceivedRequestToAddFriend(skip : $skip, limit: $limit){
      _id
      name
      slug
      avatar
    }
  }
`