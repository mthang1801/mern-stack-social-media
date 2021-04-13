import { gql } from "@apollo/client";

export const EDIT_POST_SUBSCRIPTION = gql`
  subscription EditPost {
    editPostSubscription {
      _id
      text
      rawText
      shortenText
      mentions {
        _id
        name
        avatar
        slug
        isOnline
      }
      author {
        _id
        name
        slug
        avatar
      }
      files {
        filename
        mimetype
        data
      }
      comments
      responses
      likes
      status
      createdAt
    }
  }
`;
