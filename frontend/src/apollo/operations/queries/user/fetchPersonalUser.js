import { gql } from "@apollo/client";

export const FETCH_PERSONAL_USER = gql`
  query FetchPersonalUser($slug: String!) {
    fetchPersonalUser(slug: $slug) {
      _id
      name
      nickname
      slug
      email
      friends
      notifications
      avatar
      posts {
        _id
        text
        shortenText
        mentions {
          _id
          name
          avatar
          slug
        }
        author {
          _id
          name
          slug
          avatar
        }
        comments
        responses
        likes
        status
        createdAt
      }
      countPosts
      following
      followed
      sentRequestToAddFriend
      receivedRequestToAddFriend
    }
  }
`;
