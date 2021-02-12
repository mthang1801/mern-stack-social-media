import { gql } from "@apollo/client";

export const FETCH_NOTIFICATIONS = gql`
  query FetchNotifications {
    fetchNotifications {
      _id
      field
      action
      hasSeen
      creator {
        _id
        name
        avatar
      }
      href
      acceptInvite
      createdAt
    }
  }
`;
