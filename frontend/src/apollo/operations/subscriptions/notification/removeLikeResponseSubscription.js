import {gql} from "@apollo/client";

export const REMOVE_LIKE_RESPONSE_SUBSCRIPTION = gql`
  subscription{
    removeLikeResponseSubscription{
      _id 
      field
      content
      url 
      hasSeen
      isQuestion
      creator{
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
        comment{
          _id 
          shortenText
        }
        response{
          _id 
        }
      }
      receiver
      createdAt
      updatedAt
    }
  }
`