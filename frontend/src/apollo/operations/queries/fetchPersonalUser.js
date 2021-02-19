import {gql} from "@apollo/client"

export const FETCH_PERSONAL_USER = gql`
query FetchPersonalUser($slug : String!){
  fetchPersonalUser(slug :$slug){
    _id
    name
    nickname
    email    
    friends
    posts{
      _id
      text
      createdAt
      updatedAt
    }    
  }
}
`