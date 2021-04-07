import { gql } from "@apollo/client";

export const CREATE_RESPONSE_SUBSCRIPTION = gql`
  subscription {
    createResponseSubscription {
      _id
      text
      shortenText
      rawText
      author {
        _id
        name
        slug
        avatar
      }
      comment
      post
      likes
      createdAt
      updatedAt
    }
  }
`;
