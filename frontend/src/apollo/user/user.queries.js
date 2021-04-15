import { gql } from "@apollo/client";

const FETCH_CURRENT_USER = gql`
  query{
    fetchCurrentUser {
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
  }
`;

const GET_CURRENT_USER_IN_CACHE = gql`
  query {
    user @client
  }
`


export default {
  FETCH_CURRENT_USER,
  GET_CURRENT_USER_IN_CACHE
}