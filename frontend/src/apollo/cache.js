import { InMemoryCache, makeVar } from "@apollo/client";
import {
  PostStatus,
  LatestNotification,
  CurrentPersonalUser,
  PersonalPosts,  
  Friends,
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
const setPostStatusVar = makeVar(PostStatus);
const postsVar = makeVar(initialState.posts);
const setPersonalPostsVar = makeVar(PersonalPosts);
//User
const userVar = makeVar(initialState.user);
const setCurrentPersonalUserVar = makeVar(CurrentPersonalUser);
const setSentRequestsToAddFriendVar = makeVar(SentRequestsToAddFriends);
const setReceivedRequestsToAddFriendVar = makeVar(ReceivedRequestsToAddFriend);
//Notification
const notificationsVar = makeVar(initialState.notifications);
const countNumberOfNotificationUnseenVar = makeVar(
  initialState.countNumberOfNotificationUnseen
);
const newNotificationsVar = makeVar(initialState.newNotifications);
const latestNotificationVar = makeVar(initialState.latestNotification);
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
          read: () => dialogVar(),
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
  notificationsVar,
  countNumberOfNotificationUnseenVar,
  newNotificationsVar,
  latestNotificationVar,
  setCurrentPersonalUserVar,
  setPersonalPostsVar,
  toggleFriendsBoardVar,
  setFriendsVar,
  setSentRequestsToAddFriendVar,
  setReceivedRequestsToAddFriendVar,
  setMessagesStorageVar,
  setCurrentChatVar,
  setNumberOfConversationsVar,
  dialogVar,
};
