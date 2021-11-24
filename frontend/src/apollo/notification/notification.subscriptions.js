import { gql } from '@apollo/client';

export const ACCEPT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    acceptRequestToAddFriendSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      isQuestion
      url
      fieldIdentity {
        sender {
          _id
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
        }
        receiver {
          _id
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
          notifications
        }
      }
      creator {
        _id
        name
        slug
        avatar
      }
      receiver
      updatedAt
      createdAt
    }
  }
`;

export const CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    cancelRequestToAddFriendSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      isQuestion
      url
      fieldIdentity {
        sender {
          _id
          name
          slug
          email
          avatar
          isOnline
          offlinedAt
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
        }
        receiver {
          _id
          name
          slug
          email
          avatar
          isOnline
          offlinedAt
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
        }
      }
      creator {
        _id
        name
        slug
        avatar
      }
      updatedAt
      createdAt
    }
  }
`;

export const LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription {
    likeCommentSubscription {
      comment {
        _id
        post
        likes
        author {
          _id
          name
          slug
        }
      }

      notification {
        _id
        field
        content
        url
        hasSeen
        creator {
          _id
          name
          avatar
          slug
        }
        fieldIdentity {
          post {
            _id
          }
          comment {
            _id
            shortenText
          }
        }
        receiver
        createdAt
        updatedAt
      }
    }
  }
`;

export const LIKE_POST_SUBSCRIPTION = gql`
  subscription {
    likePostSubscription {
      _id
      field
      content
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          text
          rawText
          shortenText
          likes
          status
          createdAt
        }
      }
      url
      hasSeen
      receiver
      isQuestion
      createdAt
      updatedAt
    }
  }
`;

export const LIKE_RESPONSE_SUBSCRIPTION = gql`
  subscription {
    likeResponseSubscription {
      _id
      field
      content
      url
      hasSeen
      isQuestion
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
        comment {
          _id
          shortenText
        }
        response {
          _id
        }
      }
      receiver
      createdAt
      updatedAt
    }
  }
`;

export const NOTIFY_MENTIONED_USERS_IN_COMMENT_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    notifyMentionUsersInComment(userId: $userId) {
      _id
      field
      content
      url
      hasSeen
      isQuestion
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const NOTIFY_MENTIONED_USERS_IN_POST = gql`
  subscription ($userId: ID!) {
    notifyMentionedUsersInPost(userId: $userId) {
      _id
      field
      content
      hasSeen
      creator {
        _id
        name
        avatar
      }
      fieldIdentity {
        post {
          shortenText
        }
      }
      url
      isQuestion
      createdAt
      updatedAt
    }
  }
`;

export const NOTIFY_MENTIONED_USERS_IN_RESPONSE = gql`
  subscription ($userId: ID!) {
    notifyMentionedUsersInResponse(userId: $userId) {
      _id
      field
      content
      url
      hasSeen
      isQuestion
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
        comment {
          _id
          shortenText
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    notifyUserCommentPostSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      creator {
        _id
        name
        avatar
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
      }
      url
      isQuestion
      createdAt
      updatedAt
    }
  }
`;

export const NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    notifyUserResponseCommentSubscription(userId: $userId) {
      _id
      field
      content
      url
      hasSeen
      isQuestion
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
        comment {
          _id
          shortenText
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const POST_CREATED_SUBSCRIPTIONS = gql`
  subscription NotifyCreatedPost($userId: ID!) {
    notifyCreatedPost(userId: $userId) {
      field
      action
      sender {
        _id
        avatar
        slug
        friends
        following
        followed
        sentRequestToAddFriend
        receivedRequestToAddFriend
      }
      receivers
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
        updatedAt
      }
    }
  }
`;

export const REMOVE_LIKE_COMMENT_SUBSCRIPTION = gql`
  subscription {
    removeLikeCommentSubscription {
      comment {
        _id
        post
        likes
        author {
          _id
          name
          slug
        }
      }

      notification {
        _id
        field
        content
        url
        hasSeen
        creator {
          _id
          name
          avatar
          slug
        }
        fieldIdentity {
          post {
            _id
          }
          comment {
            _id
            shortenText
          }
        }
        receiver
        createdAt
        updatedAt
      }
    }
  }
`;

export const REMOVE_LIKE_POST_SUBSCRIPTION = gql`
  subscription {
    removeLikePostSubscription {
      _id
      field
      content
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
      }
      url
      hasSeen
      receiver
      isQuestion
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_LIKE_RESPONSE_SUBSCRIPTION = gql`
  subscription {
    removeLikeResponseSubscription {
      _id
      field
      content
      url
      hasSeen
      isQuestion
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity {
        post {
          _id
          shortenText
        }
        comment {
          _id
          shortenText
        }
        response {
          _id
        }
      }
      receiver
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST = gql`
  subscription ($userId: ID!) {
    removeMentionedNotificationSubscription(userId: $userId) {
      _id
      receiver
    }
  }
`;

export const SENT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    sentRequestToAddFriendSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      isQuestion
      url
      questionType {
        yesNoQuestion
      }
      fieldIdentity {
        sender {
          _id
          name
          avatar
          email
          slug
          following
          followed
          friends
          sentRequestToAddFriend
          receivedRequestToAddFriend
        }
        receiver {
          _id
          name
          avatar
          email
          slug
          following
          followed
          friends
          receivedRequestToAddFriend
          sentRequestToAddFriend
        }
      }
      creator {
        _id
        name
        slug
        avatar
      }
      receiver
      updatedAt
      createdAt
    }
  }
`;
