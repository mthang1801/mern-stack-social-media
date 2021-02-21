import {gql} from "@apollo/client"

export const SEND_REQUEST_TO_ADD_FRIEND = gql`
subscription ($userId : ID!){
  notifyReceiveAddFriend(userId : $userId){
    field
    action
    receiver
    notification{
      _id
      field
      action
      hasSeen      
      acceptInvite
      creator{
        _id
        name
        email
        avatar
        slug
      }
      createdAt    
    }
  }
}
`