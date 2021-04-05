import { gql } from "@apollo/client";

export const FETCH_NOTIFICATIONS = gql`
  query FetchNotifications($skip : Int, $limit: Int) {
    fetchNotifications(skip : $skip, limit : $limit ) {
      _id
      field
      content
      hasSeen
      receivers
      creator {
        _id
        name
        avatar
        slug
      }
      fieldIdentity{
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
