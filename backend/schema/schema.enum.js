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
  enum PersonalChatReceiverStatusEnum{
    SENT
    DELIVERED 
    SEEN 
    DELETED
  }  
  enum PersonalChatSenderStatusEnum{
    SENT
    RECALLED
    DELETED
  }
  enum MessageTypeEnum{
    TEXT
    IMAGE
    ATTACHMENT
  }
  enum ChatScopeEnum{
    PERSONAL
    GROUP
  }
`