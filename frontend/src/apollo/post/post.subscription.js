import {gql}  from "@apollo/client";

const CREATE_COMMENT_SUBSCIPTION = gql`
  subscription ($userId : ID!){
    createCommentSubscription(userId : $userId){      
        _id
        text
        rawText
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
        updatedAt
      
    }
  }
`


const CREATE_RESPONSE_SUBSCRIPTION = gql`
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


const EDIT_POST_SUBSCRIPTION = gql`
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


const MENTION_USERS_IN_POST_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    mentionUsersInPost(userId: $userId) {
      sender {
        _id
        name
        avatar
        slug
        isOnline
      }
      notification {
        _id
        field
        content
        hasSeen
        creator {
          _id
          name
          avatar
        }
        url
        isQuestion
        createdAt
      }
    }
  }
`;


export default {
  CREATE_COMMENT_SUBSCIPTION,
  CREATE_RESPONSE_SUBSCRIPTION,
  EDIT_POST_SUBSCRIPTION,
  MENTION_USERS_IN_POST_SUBSCRIPTION
}