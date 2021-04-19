import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS_CACHE_DATA } from "../apollo/operations/queries/cache";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
} from "../apollo/notification/notification.types";
import { cacheMutations } from "../apollo/operations/mutations";
import {
  addLikeResponse,
  removeLikeResponse,
  updateCommentLikes,
} from "../apollo/post/post.caches";
import {
  ACCEPT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  LIKE_COMMENT_SUBSCRIPTION,
  LIKE_POST_SUBSCRIPTION,
  LIKE_RESPONSE_SUBSCRIPTION,
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
} from "../apollo/notification/notification.types";
import {
  addNotificationItemToNotificationsList,
  increaseCountNumberNotificationsUnseen,
  decreaseCountNumberNotificationsUnseen,
} from "../apollo/notification/notification.caches";
import { setCurrentUser } from "../apollo/user/user.caches";
import {
  removeNewNotification,
  removeNotificationItemFromNotificationsList,
  setCountNumberNotificationsUnseen,
  setNewNotifications,
  setLatestNotification,
  updateNotificationItemInNotificationsList,
} from "../apollo/notification/notification.caches";
const useNotificationsPostSubscription = () => {
  const { subscribeToMore: subscribeToMoreNotifications } = useQuery(
    FETCH_NOTIFICATIONS,
    {
      skip: true,
      fetchPolicy: "cache-and-network",
    }
  );
  const { refetch: fetchCountNumberNotificationsUnseen } = useQuery(
    FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
    {
      skip: true,
      fetchPolicy: "cache-and-network",
    }
  );
  const {
    data: {
      countNumberNotificationsUnseen,
      user,
      notifications,
      currentPersonalUser,
      receivedRequestsToAddFriend,
      personalPosts,
      latestNotification,
    },
  } = useQuery(GET_NOTIFICATIONS_CACHE_DATA, {
    fetchPolicy: "cache-first",
  });
  //mutations
  const { setCurrentPersonalUser } = cacheMutations;

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
      increaseCountNumberNotificationsUnseen();
      addNotificationItemToNotificationsList(newNotification);
    }
  };

  const updatedRemoveNotification = (removedNotification, sender, receiver) => {
    if (latestNotification?._id === removedNotification._id) {
      setLatestNotification(null);
    }
    removeNewNotification(removedNotification._id);
    decreaseCountNumberNotificationsUnseen();
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
            const {
              sentRequestToAddFriendSubscription: notification,
            } = subscriptionData.data;
            const { receiver, sender } = notification?.fieldIdentity;
            if (sender && receiver) {
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
            const {
              cancelRequestToAddFriendSubscription: notification,
            } = subscriptionData.data;

            console.log(subscriptionData);
            const { sender, receiver } = notification.fieldIdentity;
            if (sender && receiver) {
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
            const {
              acceptRequestToAddFriendSubscription: notification,
            } = subscriptionData.data;
            const { sender, receiver } = notification.fieldIdentity;
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
          console.log(subscriptionData);
          if (subscriptionData) {
            const { notifyMentionedUsersInPost } = subscriptionData.data;
            console.log(notifyMentionedUsersInPost);
            updatedAddNotification(notifyMentionedUsersInPost);
          }
        },
      });
      unsubscribeUserLikePost = subscribeToMoreNotifications({
        document: LIKE_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { likePostSubscription } = subscriptionData.data;
            if (likePostSubscription) {
              updatedAddNotification(likePostSubscription);
             
            }
          }
        },
      });
      unsubscribeUserRemoveLikePost = subscribeToMoreNotifications({
        document: REMOVE_LIKE_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { removeLikePostSubscription } = subscriptionData.data;
            updatedRemoveNotification(removeLikePostSubscription);
          }
        },
      });

      unsubscribeOwnerPostReceivedUserComment = subscribeToMoreNotifications({
        document: NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyUserCommentPostSubscription } = subscriptionData.data;
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
            const {
              comment,
              notification,
            } = subscriptionData.data.likeCommentSubscription;
            //create notification to receiver
            if (notification && notification.receiver === user._id) {
              updatedAddNotification(notification);
            }
            if (
              !notification ||
              (notification && notification.creator._id !== user._id)
            ) {
              updateCommentLikes(comment);
            }
          }
        },
      });
      unsubscribeRemoveLikeComment = subscribeToMoreNotifications({
        document: REMOVE_LIKE_COMMENT_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const {
              comment,
              notification,
            } = subscriptionData.data.removeLikeCommentSubscription;
            if (notification && notification.receiver === user._id) {
              updatedRemoveNotification(notification);
            }
            if (
              !notification ||
              (notification && notification.creator._id !== user._id)
            ) {
              updateCommentLikes(comment);
            }
          }
        },
      });
      unsubscribeUserResponseComment = subscribeToMoreNotifications({
        document: NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const {
              notifyUserResponseCommentSubscription,
            } = subscriptionData.data;
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
        document: LIKE_RESPONSE_SUBSCRIPTION,
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { likeResponseSubscription } = subscriptionData.data;
            if (likeResponseSubscription.receiver.toString() === user._id) {
              updatedAddNotification(likeResponseSubscription);
            }
            const {
              post,
              comment,
              response,
            } = likeResponseSubscription.fieldIdentity;
            if (likeResponseSubscription.creator._id.toString() !== user._id) {
              addLikeResponse(
                post._id,
                comment._id,
                response._id,
                likeResponseSubscription.creator._id
              );
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
            const {
              post,
              comment,
              response,
            } = removeLikeResponseSubscription.fieldIdentity;
            if (
              removeLikeResponseSubscription.creator._id.toString() !== user._id
            ) {
              removeLikeResponse(
                post._id,
                comment._id,
                response._id,
                removeLikeResponseSubscription.creator._id
              );
            }
          }
        },
      });

      unsubscribeRemoveMentionedUsersNotificationInPost = subscribeToMoreNotifications(
        {
          document: REMOVE_MENTIONED_USERS_NOTIFICATION_IN_POST,
          variables: { userId: user._id },
          updateQuery: (_, { subscriptionData }) => {
            if (subscriptionData) {
              const {
                removeMentionedNotificationSubscription,
              } = subscriptionData.data;
              updatedRemoveNotification(
                removeMentionedNotificationSubscription
              );
            }
          },
        }
      );
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
