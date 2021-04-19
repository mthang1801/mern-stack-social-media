import { InMemoryCache, makeVar } from "@apollo/client";
import {
  PersonalPosts, 
  SentRequestsToAddFriends,
  ReceivedRequestsToAddFriend,
  MessagesStorage,
  CurrentChat,
  NumberOfConversations,
} from "./models";
import { initialState } from "./initialState";
//Cache
const toggleMenuVar = makeVar(initialState.toggleMenu);
const dialogVar = makeVar(initialState.alertDialog);
//Post
const postsVar = makeVar(initialState.posts);
const setPersonalPostsVar = makeVar(PersonalPosts);
//User
const userVar = makeVar(initialState.user);
const currentPersonalUserVar = makeVar(initialState.currentPersonalUser);
const sentRequestsToAddFriendVar = makeVar(initialState.sentRequestToAddFriend);
const receivedRequestsToAddFriendVar = makeVar(initialState.receivedRequestsToAddFriend);
//Notification
const notificationsVar = makeVar(initialState.notifications);
const countNumberOfNotificationUnseenVar = makeVar(
  initialState.countNumberOfNotificationUnseen
);
const newNotificationsVar = makeVar(initialState.newNotifications);
const latestNotificationVar = makeVar(initialState.latestNotification);
//Friends
const toggleFriendsBoardVar = makeVar(initialState.toggleFriendsBoard);
const friendsVar = makeVar(initialState.friends);
//Chat
const messagesStorageVar = makeVar(initialState.messagesStorage);
const currentChatVar = makeVar(initialState.currentChat);
const numberOfConversationsVar = makeVar(initialState.numberOfConversations);
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //cache
        toggleMenu: {
          read: () => toggleMenuVar(),
        },
        dialog: {
          read: () => dialogVar(),
        },
        //current User
        user: {
          read: () => userVar(),
        },
        //other user
        sentRequestsToAddFriend: {
          read: () => sentRequestsToAddFriendVar(),
        },
        receivedRequestsToAddFriend: {
          read: () => receivedRequestsToAddFriendVar(),
        },
        currentPersonalUser: {
          read: () => currentPersonalUserVar(),
        },
        //post       
        posts: {
          read: () => postsVar(),
        },
        personalPosts: {
          read: () => setPersonalPostsVar(),
        },
        //Friends
        friends: {
          read: () => friendsVar(),
        },
        toggleFriendsBoard: {
          read: () => toggleFriendsBoardVar(),
        },
        //notification
        notifications: {
          read: () => notificationsVar(),
        },
        newNotifications: {
          read: () => newNotificationsVar(),
        },
        //if has new notification, open popup immediately
        latestNotification: {
          read: () => latestNotificationVar(),
        },
        countNumberNotificationsUnseen: {
          read: () => countNumberOfNotificationUnseenVar(),
        },
        //Chat
        currentChat: {
          read: () => currentChatVar(),
        },
        messagesStorage: {
          read: () => messagesStorageVar(),
        },
        numberOfConversations: {
          read: () => numberOfConversationsVar(),
        },
      },
    },
  },
});

export {
  cache,
  toggleMenuVar,
  userVar,
  postsVar,
  notificationsVar,
  countNumberOfNotificationUnseenVar,
  newNotificationsVar,
  latestNotificationVar,
  currentPersonalUserVar,
  setPersonalPostsVar,
  toggleFriendsBoardVar,
  friendsVar,
  sentRequestsToAddFriendVar,
  receivedRequestsToAddFriendVar,
  messagesStorageVar,
  currentChatVar,
  numberOfConversationsVar,
  dialogVar,
};
