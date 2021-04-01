import { gql } from "@apollo/client";

export const CREATE_RESPONSE = gql`
mutation CreateResponse($commentId: ID!, $text : String, $mentions : [ID!]){
  createResponse(commentId : $commentId, data: {text : $text, mentions: $mentions}){
   _id
    text
    author{
    	_id
      name
      avatar
      slug
    }
    comment
    likes 
    
    createdAt    
  }
}
`;
