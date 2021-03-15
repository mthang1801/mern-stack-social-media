import {gql} from "@apollo/client";

export const GET_NUMBER_OF_CONVERSATIONS = gql`
  query{
    numberOfConversations @client
  }
` 