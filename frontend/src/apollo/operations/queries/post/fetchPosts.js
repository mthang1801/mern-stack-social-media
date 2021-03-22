import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query ($limit : Int, $skip: Int, $userId : ID){
    fetchPosts(limit : $limit, skip: $skip, userId : $userId) {
      _id
      text
      mentions {
        _id
        name
        email
        slug
      }      
      author {
        _id
        name
        email
        avatar
        slug
        isOnline
        offlinedAt
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
`;
