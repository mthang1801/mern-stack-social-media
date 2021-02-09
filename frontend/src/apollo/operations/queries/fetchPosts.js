import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query {
    fetchPosts {
      _id
      text
      mentions {
        _id
        name
        email
      }
      tags
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
