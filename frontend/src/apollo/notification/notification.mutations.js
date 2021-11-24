import { gql } from '@apollo/client';

export const UPDATE_USER_HAS_SEEN_NOTIFICATION = gql`
  mutation UpdateUserHasSeenNotification($notificationId: ID!) {
    updateUserHasSeenNotification(notificationId: $notificationId)
  }
`;
