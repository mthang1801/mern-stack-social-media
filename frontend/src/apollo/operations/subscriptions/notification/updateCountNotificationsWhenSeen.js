import { gql } from "@apollo/client";

export const UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION = gql`
  subscription UpdateCountNotificationsWhenSeen($userId: ID!) {
    updateCountNotificationsWhenSeen(userId: $userId)
  }
`;
