import {gql} from "@apollo/client";

export const FETCH_COMMENTS = gql`
  query FetchComments($postId : ID!, $except : [ID!], $skip : Int, $limit : Int){
    fetchComments(postId : $postId, except : $except, skip : $skip, limit : $limit){
      _id 
      text
      mentions
      author{
        _id
        name 
        avatar
        slug
        isOnline
        offlinedAt
      }
      post
      likes 
      responses 
      createdAt 
      updatedAt 
    }
  }
`