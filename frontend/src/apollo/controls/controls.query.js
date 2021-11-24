import { gql, useQuery } from '@apollo/client';

const TOGGLE_MENU = gql`
  query {
    toggleMenu @client
  }
`;

export default {
  TOGGLE_MENU,
};
