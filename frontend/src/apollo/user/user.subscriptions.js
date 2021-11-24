import { gql } from '@apollo/client';

export const CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription ($userId: ID!) {
    cancelRequestToAddFriendSubscription(userId: $userId) {
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
          slug
          following
          followed
          friends
          receivedRequestToAddFriend
          sentRequestToAddFriend
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
