import {gql} from "@apollo/client";

export const GET_TOGGLE_BUTTON_MENU = gql`
  query GetToggleButtonMenu{
    toggleButtonMenu @client
  }
`