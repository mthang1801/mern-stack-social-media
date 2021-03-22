import {gql} from "@apollo/client"

export const FETCH_PERSONAL_USER = gql`
query FetchPersonalUser($slug : String!){
  fetchPersonalUser(slug :$slug){
    _id
    name
    slug
    nickname
    email    
    friends
    avatar  
    following
    followed
    sentRequestToAddFriend 
    receivedRequestToAddFriend 
    isOnline
    offlinedAt
    posts{
      _id
      text
      mentions {
        _id
        name
        email
      }           
      files{
        filename
        mimetype
        encoding
      }
      status
      createdAt
    }    
     
  }
}
`