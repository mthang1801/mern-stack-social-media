import { gql } from "@apollo/client";

export const FETCH_NOTIFICATIONS = gql`
  query FetchNotifications($skip : Int, $limit: Int) {
    fetchNotifications(skip : $skip, limit : $limit ) {
      _id
      field
      action
      hasSeen
      receivers
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
