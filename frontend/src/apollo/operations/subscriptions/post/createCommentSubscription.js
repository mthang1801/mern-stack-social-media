import {gql}  from "@apollo/client";

export const CREATE_COMMENT_SUBSCIPTION = gql`
  subscription ($userId : ID!){
    createCommentSubscription(userId : $userId){
      comment {
        _id
        text
        author {
          _id
          name
          avatar
          slug
        }
        post
        likes
        responses
        createdAt
      }
    }
  }
`