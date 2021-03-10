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
    ADDED
    ACCEPTED
    REMOVED
  }  
  enum ContactEnum{
    ADDED
    ACCEPTED
    REMOVED
  }
  enum PrivateChatReceiverStatusEnum{
    SENT
    DELIVERED 
    SEEN 
    DELETED
  }  
  enum PrivateChatSenderStatusEnum{
    SENT
    RECALLED
    DELETED
  }
  enum MessageTypeEnum{
    TEXT
    IMAGE
    PICTURE
  }
  enum ChatStatusEnum{
    PRIVATE
    GROUP
  }
`