import { InMemoryCache, makeVar } from "@apollo/client";
import {
  ToggleButtonMenu,
  PostStatus,
  User,
  Posts,
  Notifications,
  CountNumberNotificationsUnseen,
  NewNotifications,
  LatestNotification,
  CurrentPersonalUser,
  PersonalPosts,
  OpenFriendsList,
  Friends,
  SentRequestsToAddFriends,
  ReceivedRequestsToAddFriend,
  MessagesStorage,  
  CurrentChat,
  NumberOfConversations
} from "./models";
const toggleButtonMenuVar = makeVar(ToggleButtonMenu);
//Post
const setPostStatusVar = makeVar(PostStatus);
const setPostsVar = makeVar(Posts);
const setPersonalPostsVar = makeVar(PersonalPosts);
//User
const setUserVar = makeVar(User);
const setCurrentPersonalUserVar = makeVar(CurrentPersonalUser);
const setSentRequestsToAddFriendVar = makeVar(SentRequestsToAddFriends);
const setReceivedRequestsToAddFriendVar = makeVar(ReceivedRequestsToAddFriend);
//Notification
const setNotificationsVar = makeVar(Notifications);
const setCountNumberNotificationsUnseenVar = makeVar(
  CountNumberNotificationsUnseen
);
const setNewNotificationsVar = makeVar(NewNotifications);
const setLatestNotificationVar = makeVar(LatestNotification);
//Friends
const setOpenFriendsListVar = makeVar(OpenFriendsList);
const setFriendsVar = makeVar(Friends);
//Chat
const setMessagesStorageVar = makeVar(MessagesStorage);
const setCurrentChatVar = makeVar(CurrentChat);
const setNumberOfConversationsVar = makeVar(NumberOfConversations);
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //current User
        user: {
          read: () => setUserVar(),
        },
        //other user
        sentRequestsToAddFriend: {
          read: () => setSentRequestsToAddFriendVar(),
        },
        receivedRequestsToAddFriend: {
          read: () => setReceivedRequestsToAddFriendVar(),
        },
        currentPersonalUser: {
          read: () => setCurrentPersonalUserVar(),
        },      
        //UI
        toggleButtonMenu: {
          read: () => toggleButtonMenuVar(),
        },
        //post
        postStatus: {
          read: () => setPostStatusVar(),
        },
        posts: {
          read: () => setPostsVar(),
        },
        personalPosts: {
          read: () => setPersonalPostsVar(),
        },
        //Friends
        friends: {
          read: () => setFriendsVar(),
        },
        openFriendsList: {
          read: () => setOpenFriendsListVar(),
        },
        //notification
        notifications: {
          read: () => setNotificationsVar(),
        },
        newNotifications: {
          read: () => setNewNotificationsVar(),
        },
        //if has new notification, open popup immediately
        latestNotification: {
          read: () => setLatestNotificationVar(),
        },        
        countNumberNotificationsUnseen: {
          read: () => setCountNumberNotificationsUnseenVar(),
        },
        //Chat       
        currentChat: {
          read: () => setCurrentChatVar(),
        },
        messagesStorage: {
          read: () => setMessagesStorageVar(),
        },  
        numberOfConversations : {
          read : () => setNumberOfConversationsVar()
        }              
      },
    },
  },
});

export {
  cache,
  toggleButtonMenuVar,
  setPostStatusVar,
  setUserVar,
  setPostsVar,
  setNotificationsVar,
  setCountNumberNotificationsUnseenVar,
  setNewNotificationsVar,
  setLatestNotificationVar,
  setCurrentPersonalUserVar,
  setPersonalPostsVar,
  setOpenFriendsListVar,
  setFriendsVar,
  setSentRequestsToAddFriendVar,
  setReceivedRequestsToAddFriendVar,
  setMessagesStorageVar,  
  setCurrentChatVar,  
  setNumberOfConversationsVar
};
