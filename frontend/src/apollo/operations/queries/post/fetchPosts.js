import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query ($userId : ID, $skip: Int, $limit : Int ){
    fetchPosts(userId : $userId, skip: $skip, limit : $limit) {
      _id
      text
      mentions {
        _id
        name
        avatar
        slug
        isOnline
      }      
      author {
        _id
        name
        slug
        avatar
      }
      files{
        filename
        mimetype
        data
      }
      comments{
        _id 
        text
        post
        author{
          _id
          name
          avatar
          slug
        }
        likes
        subComments{
          _id 
          text
          post
          author{
            _id
            name
            avatar
            slug
          }
        }
        createdAt
      }
      likes      
      status
      createdAt
    }
  }
`;
