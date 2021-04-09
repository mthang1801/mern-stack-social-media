import {gql} from "@apollo/client";

export const GET_PERSONAL_USER_CACHE_DATA =gql`
  query GetPersonalUserHeading{
    currentPersonalUser @client
    user @client 
  }
`