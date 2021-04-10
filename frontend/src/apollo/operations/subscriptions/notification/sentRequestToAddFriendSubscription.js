import { gql } from "@apollo/client";

export const SENT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    sentRequestToAddFriendSubscription(userId: $userId) {
      _id
      field
      content
      hasSeen
      isQuestion
      questionType{
        yesNoQuestion
      }
      fieldIdentity {
        sender {
          _id
          name
          slug
          following
          friends
          sentRequestToAddFriend
        }
        receiver {
          _id
          name
          slug
          followed
          friends
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
      updatedAt
      createdAt
    }
  }
`;
