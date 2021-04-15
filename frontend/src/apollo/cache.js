import { InMemoryCache, makeVar } from "@apollo/client";
import {
  PostStatus,
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
  NumberOfConversations,
  Dialog,
} from "./models";
import { initialState } from "./initialState";
//Cache
const toggleMenuVar = makeVar(initialState.toggleMenu);
const setDialogVar = makeVar(Dialog);
//Post
const setPostStatusVar = makeVar(PostStatus);
const postsVar = makeVar(Posts);
const setPersonalPostsVar = makeVar(PersonalPosts);
//User
const userVar = makeVar(initialState.user);
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
const toggleFriendsBoardVar = makeVar(initialState.toggleFriendsBoard);
const setFriendsVar = makeVar(Friends);
//Chat
const setMessagesStorageVar = makeVar(MessagesStorage);
const setCurrentChatVar = makeVar(CurrentChat);
const setNumberOfConversationsVar = makeVar(NumberOfConversations);
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //cache
        toggleMenu: {
          read: () => toggleMenuVar(),
        },
        dialog: {
          read: () => setDialogVar(),
        },
        //current User
        user: {
          read: () => userVar(),
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
        //post
        postStatus: {
          read: () => setPostStatusVar(),
        },
        posts: {
          read: () => postsVar(),
        },
        personalPosts: {
          read: () => setPersonalPostsVar(),
        },
        //Friends
        friends: {
          read: () => setFriendsVar(),
        },
        toggleFriendsBoard: {
          read: () => toggleFriendsBoardVar(),
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
        numberOfConversations: {
          read: () => setNumberOfConversationsVar(),
        },
      },
    },
  },
});

export {
  cache,
  toggleMenuVar,
  setPostStatusVar,
  userVar,
  postsVar,
  setNotificationsVar,
  setCountNumberNotificationsUnseenVar,
  setNewNotificationsVar,
  setLatestNotificationVar,
  setCurrentPersonalUserVar,
  setPersonalPostsVar,
  toggleFriendsBoardVar,
  setFriendsVar,
  setSentRequestsToAddFriendVar,
  setReceivedRequestsToAddFriendVar,
  setMessagesStorageVar,
  setCurrentChatVar,
  setNumberOfConversationsVar,
  setDialogVar,
};
