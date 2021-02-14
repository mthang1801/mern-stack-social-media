import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query ($limit : Int, $skip: Int){
    fetchPosts(limit : $limit, skip: $skip) {
      _id
      text
      mentions {
        _id
        name
        email
      }      
      author {
        _id
        name
        email
        avatar
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
