import {gql} from "@apollo/client";

export const GET_TOGGLE_BUTTON_MENU_MOBILE = gql`
  query GetToggleButtonMenuMobile{
    toggleButtonMenuMobile @client
  }
`