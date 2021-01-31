import {gql} from "apollo-server-express";

export const schemaEnum = gql`
  enum PostStatus{
    public
    private
  }
  enum ActionEnum{
    CREATED
    UPDATED
    DELETED
  }  
  enum ContactEnum{
    ADDED
    ACCEPTED
    REMOVED
  }
  enum PrivateChatEnum{
    SEND
    DELETE
    RECALL
  }  
`