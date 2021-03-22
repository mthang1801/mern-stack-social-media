import {gql} from "@apollo/client"

export const GET_OPEN_POPUP_NOTIFICATION = gql`
  query {
    openPopupNotification @client
  }
`