import { useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import {
  countNumberOfNotificationUnseenVar,
  userVar,
  currentPersonalUserVar,
  notificationsVar,
  receivedRequestsToAddFriendVar,
  latestNotificationVar,
} from '../apollo/cache';
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
} from '../apollo/notification/notification.types';
import { setCurrentPersonalUser } from '../apollo/user/currentPersonalUser.caches';
import {
  addUserToReceivedRequestToAddFriend,
  removeUserFromReceivedRequestToAddFriend,
  moveSentRequestToFriend,
} from '../apollo/contact/contact.caches';
import {
  ACCEPT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  LIKE_COMMENT_SUBSCRIPTION,
  LIKE_POST_SUBSCRIPTION_NOTIFICATION,
  LIKE_RESPONSE_SUBSCRIPTION_NOTIFICATION,
  NOTIFY_MENTIONED_USERS_IN_COMMENT_SUBSCRIPTION,
  NOTIFY_MENTIONED_USERS_IN_POST,
  NOTIFY_MENTIONED_USERS_IN_RESPONSE,
  NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION,
  NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION,
  REMOVE_LIKE_COMMENT_SUBSCRIPTION,
  REMOVE_LIKE_POST_SUBSCRIPTION,
  REMOVE_LIKE_RESPONSE_SUBSCRIPTION,
  REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST,
  SENT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
} from '../apollo/notification/notification.types';
import { addNotificationItemToNotificationsList } from '../apollo/notification/notification.caches';
import { setCurrentUser } from '../apollo/user/user.caches';
import {
  removeNotificationItemFromNotificationsList,
  setCountNumberNotificationsUnseen,
  setNewNotifications,
  setLatestNotification,
  updateNotificationItemInNotificationsList,
} from '../apollo/notification/notification.caches';
const useNotificationsPostSubscription = () => {
  const { subscribeToMore: subscribeToMoreNotifications } = useQuery(
    FETCH_NOTIFICATIONS,
    {
      skip: true,
      fetchPolicy: 'cache-and-network',
    }
  );
  const { refetch: fetchCountNumberNotificationsUnseen } = useQuery(
    FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
    {
      skip: true,
      fetchPolicy: 'cache-and-network',
    }
  );
  const countNumberNotificationsUnseen = useReactiveVar(
    countNumberOfNotificationUnseenVar
  );
  const user = useReactiveVar(userVar);
  const notifications = useReactiveVar(notificationsVar);
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const receivedRequestsToAddFriend = useReactiveVar(
    receivedRequestsToAddFriendVar
  );
  const latestNotification = useReactiveVar(latestNotificationVar);
  useEffect(() => {
    let _isMounted = true;
    if (countNumberNotificationsUnseen === null) {
      fetchCountNumberNotificationsUnseen().then(
        ({ data: { countNotificationsUnseen } }) => {
          if (_isMounted) {
            setCountNumberNotificationsUnseen(countNotificationsUnseen);
          }
        }
      );
    }
    return () => (_isMounted = false);
  }, [
    countNumberNotificationsUnseen,
    fetchCountNumberNotificationsUnseen,
    setCountNumberNotificationsUnseen,
  ]);

  //sender and receiver only use in field 'user'
  const updatedAddNotification = (
    newNotification,
    sender = null,
    receiver = null
  ) => {
    setLatestNotification(newNotification);
    setNewNotifications(newNotification._id);

    if (sender && receiver) {
      setCurrentUser({
        ...user,
        ...receiver,
      });

      if (currentPersonalUser && currentPersonalUser._id === sender._id) {
        setCurrentPersonalUser({
          ...currentPersonalUser,
          ...sender,
        });
      }
    }
    if (
      notifications.find(
        (notification) => notification._id === newNotification._id
      )
    ) {
      updateNotificationItemInNotificationsList(newNotification);
    } else {
      addNotificationItemToNotificationsList(newNotification);
    }
  };

  const updatedRemoveNotification = (removedNotification, sender, receiver) => {
    if (latestNotification?._id === removedNotification._id) {
      setLatestNotification(null);
    }
    removeNotificationItemFromNotificationsList(removedNotification);
    if (sender && receiver) {
      setCurrentUser({
        ...user,
        ...receiver,
      });
      if (currentPersonalUser && currentPersonalUser._id === sender._id) {
        setCurrentPersonalUser({
          ...currentPersonalUser,
          ...sender,
        });
      }
      return;
    }
    setCurrentUser({
      ...user,
      notifications: [
        ...notifications.filter((_id) => _id !== removedNotification._id),
      ],
    });
  };

  useEffect(() => {
    let unsubscribeRequestAddFriend,
      unsubscribeCancelRequestToAddFriend,
      unsubscribeAcceptRequestToAddFriend,
      unsubscribeMentionedUsersInPost,
      unsubscribeAcceptRequestAddFriend,
      unsubscribeUserLikePost,
      unsubscribeUserRemoveLikePost,
      unsubscribeOwnerPostReceivedUserComment,
      unsubscribeMentionedUsersInComment,
      unsubscribeLikeComment,
      unsubscribeRemoveLikeComment,
      unsubscribeUserResponseComment,
      unsubscribeMentionedUsersInResponse,
      unsubscribeUserLikeResponse,
      unsubscribeUserRemoveLikeResponse,
      unsubscribeRemoveMentionedUsersNotificationInPost;
    if (subscribeToMoreNotifications && user) {
      //#region Contact
      unsubscribeRequestAddFriend = subscribeToMoreNotifications({
        document: SENT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { sentRequestToAddFriendSubscription: notification } =
              subscriptionData.data;
            const { receiver, sender } = notification?.fieldIdentity;
            console.log(subscriptionData);
            if (sender && receiver) {
              addUserToReceivedRequestToAddFriend(sender);
              updatedAddNotification(notification, sender, receiver);
            }
          }
        },
      });

      unsubscribeCancelRequestToAddFriend = subscribeToMoreNotifications({
        document: CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { cancelRequestToAddFriendSubscription: notification } =
              subscriptionData.data;
            const { sender, receiver } = notification.fieldIdentity;
            if (sender && receiver) {
              removeUserFromReceivedRequestToAddFriend(sender);
              updatedRemoveNotification(notification, sender, receiver);
            }
          }
        },
      });

      unsubscribeAcceptRequestToAddFriend = subscribeToMoreNotifications({
        document: ACCEPT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { acceptRequestToAddFriendSubscription: notification } =
              subscriptionData.data;
            const { sender, receiver } = notification.fieldIdentity;
            moveSentRequestToFriend(sender);
            updatedAddNotification(notification, sender, receiver);
          }
        },
      });

      //#endregion

      //#region Post
      unsubscribeMentionedUsersInPost = subscribeToMoreNotifications({
        document: NOTIFY_MENTIONED_USERS_IN_POST,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionedUsersInPost } = subscriptionData.data;
            updatedAddNotification(notifyMentionedUsersInPost);
          }
        },
      });
      unsubscribeUserLikePost = subscribeToMoreNotifications({
        document: LIKE_POST_SUBSCRIPTION_NOTIFICATION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { likePostSubscriptionNotification } = subscriptionData.data;
            if (
              user._id.toString() ===
              likePostSubscriptionNotification?.receiver.toString()
            ) {
              updatedAddNotification(likePostSubscriptionNotification);
            }
          }
        },
      });
      unsubscribeUserRemoveLikePost = subscribeToMoreNotifications({
        document: REMOVE_LIKE_POST_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { removeLikePostSubscription } = subscriptionData.data;
            if (removeLikePostSubscription?.receiver === user._id) {
              updatedRemoveNotification(removeLikePostSubscription);
            }
          }
        },
      });

      unsubscribeOwnerPostReceivedUserComment = subscribeToMoreNotifications({
        document: NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyUserCommentPostSubscription } = subscriptionData.data;
            console.log(notifyUserCommentPostSubscription);
            updatedAddNotification(notifyUserCommentPostSubscription);
          }
        },
      });
      unsubscribeMentionedUsersInComment = subscribeToMoreNotifications({
        document: NOTIFY_MENTIONED_USERS_IN_COMMENT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionUsersInComment } = subscriptionData.data;
            updatedAddNotification(notifyMentionUsersInComment);
          }
        },
      });
      unsubscribeLikeComment = subscribeToMoreNotifications({
        document: LIKE_COMMENT_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          console.log(subscriptionData);
          if (subscriptionData) {
            const { likeCommentSubscriptionNotification } =
              subscriptionData.data;
            //create notification to receiver
            if (
              likeCommentSubscriptionNotification &&
              likeCommentSubscriptionNotification.receiver === user._id
            ) {
              updatedAddNotification(likeCommentSubscriptionNotification);
            }
          }
        },
      });
      unsubscribeRemoveLikeComment = subscribeToMoreNotifications({
        document: REMOVE_LIKE_COMMENT_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          if (
            subscriptionData.data?.removeLikeCommentSubscriptionNotification
          ) {
            const { removeLikeCommentSubscriptionNotification } =
              subscriptionData.data;
            if (
              removeLikeCommentSubscriptionNotification &&
              removeLikeCommentSubscriptionNotification.receiver === user._id
            ) {
              updatedRemoveNotification(
                removeLikeCommentSubscriptionNotification
              );
            }
          }
        },
      });
      unsubscribeUserResponseComment = subscribeToMoreNotifications({
        document: NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyUserResponseCommentSubscription } =
              subscriptionData.data;
            updatedAddNotification(notifyUserResponseCommentSubscription);
          }
        },
      });
      unsubscribeMentionedUsersInResponse = subscribeToMoreNotifications({
        document: NOTIFY_MENTIONED_USERS_IN_RESPONSE,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionedUsersInResponse } = subscriptionData.data;
            updatedAddNotification(notifyMentionedUsersInResponse);
          }
        },
      });
      unsubscribeUserLikeResponse = subscribeToMoreNotifications({
        document: LIKE_RESPONSE_SUBSCRIPTION_NOTIFICATION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { likeResponseSubscriptionNotification } =
              subscriptionData.data;
            console.log(likeResponseSubscriptionNotification);
            if (
              likeResponseSubscriptionNotification.receiver.toString() ===
              user._id
            ) {
              updatedAddNotification(likeResponseSubscriptionNotification);
            }
          }
        },
      });
      unsubscribeUserRemoveLikeResponse = subscribeToMoreNotifications({
        document: REMOVE_LIKE_RESPONSE_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { removeLikeResponseSubscription } = subscriptionData.data;
            if (
              removeLikeResponseSubscription.receiver.toString() === user._id
            ) {
              updatedRemoveNotification(removeLikeResponseSubscription);
            }
          }
        },
      });

      unsubscribeRemoveMentionedUsersNotificationInPost =
        subscribeToMoreNotifications({
          document: REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST,
          variables: { userId: user._id },
          updateQuery: (_, { subscriptionData }) => {
            if (subscriptionData) {
              const { removeMentionedNotificationSubscription } =
                subscriptionData.data;
              updatedRemoveNotification(
                removeMentionedNotificationSubscription
              );
            }
          },
        });
      //#endregion
    }

    return () => {
      if (unsubscribeRequestAddFriend) {
        unsubscribeRequestAddFriend();
      }
      if (unsubscribeCancelRequestToAddFriend) {
        unsubscribeCancelRequestToAddFriend();
      }
      if (unsubscribeAcceptRequestToAddFriend) {
        unsubscribeAcceptRequestToAddFriend();
      }
      if (unsubscribeMentionedUsersInPost) {
        unsubscribeMentionedUsersInPost();
      }
      if (unsubscribeUserLikePost) {
        unsubscribeUserLikePost();
      }
      if (unsubscribeUserRemoveLikePost) {
        unsubscribeUserRemoveLikePost();
      }
      if (unsubscribeAcceptRequestAddFriend) {
        unsubscribeAcceptRequestAddFriend();
      }
      if (unsubscribeOwnerPostReceivedUserComment) {
        unsubscribeOwnerPostReceivedUserComment();
      }
      if (unsubscribeMentionedUsersInComment) {
        unsubscribeMentionedUsersInComment();
      }
      if (unsubscribeLikeComment) {
        unsubscribeLikeComment();
      }
      if (unsubscribeRemoveLikeComment) {
        unsubscribeRemoveLikeComment();
      }
      if (unsubscribeUserResponseComment) {
        unsubscribeUserResponseComment();
      }
      if (unsubscribeMentionedUsersInResponse) {
        unsubscribeMentionedUsersInResponse();
      }
      if (unsubscribeUserLikeResponse) {
        unsubscribeUserLikeResponse();
      }
      if (unsubscribeUserRemoveLikeResponse) {
        unsubscribeUserRemoveLikeResponse();
      }
      if (unsubscribeRemoveMentionedUsersNotificationInPost) {
        unsubscribeRemoveMentionedUsersNotificationInPost();
      }
    };
  }, [
    countNumberNotificationsUnseen,
    subscribeToMoreNotifications,
    receivedRequestsToAddFriend,
    notifications,
    user,
  ]);
};

export default useNotificationsPostSubscription;
