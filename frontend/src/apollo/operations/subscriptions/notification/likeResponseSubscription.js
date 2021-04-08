import {gql} from "@apollo/client";

export const LIKE_RESPONSE_SUBSCRIPTION = gql`
  subscription{
    likeResponseSubscription{
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