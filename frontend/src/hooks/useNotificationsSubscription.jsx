import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS_CACHE_DATA } from "../apollo/operations/queries/cache";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
} from "../apollo/operations/queries/notification";
import { cacheMutations } from "../apollo/operations/mutations";
import subscriptions from "../apollo/operations/subscriptions";
const useNotificationsSubscription = () => {
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
  const {
    setCountNumberNotificationsUnseen,
    increaseNumberNotificationsUnseen,
    decreaseNumberNotificationsUnseen,
    setNewNotifications,
    setLatestNotification,
    setCurrentUser,
    setCurrentPersonalUser,
    setReceivedRequestsToAddFriend,
    setPersonalPosts,
    addLikeResponse,
    removeLikeResponse,
    updateCommentLikes,
    removeNewNotification,
    addNotificationItemToNotificationsList,
    removeNotificationItemFromNotificationsList,
    updateNotificationItemInNotificationsList,
  } = cacheMutations;

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
        ...receiver,
      });

      if (currentPersonalUser && currentPersonalUser._id === sender._id) {
        setCurrentPersonalUser({
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
      increaseNumberNotificationsUnseen();
      addNotificationItemToNotificationsList(newNotification);
    }
  };

  const updatedRemoveNotification = (removedNotification) => {
    if (latestNotification?._id === removedNotification._id) {
      setLatestNotification(null);
    }
    removeNewNotification(removedNotification._id);
    decreaseNumberNotificationsUnseen();
    setCurrentUser({
      ...user,
      notifications: [
        ...notifications.filter((_id) => _id !== removedNotification._id),
      ],
    });
    removeNotificationItemFromNotificationsList(removedNotification);
  };

  useEffect(() => {
    let unsubscribeMentionUsersInPost,
      unsubscribeRequestAddFriend,
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
      unsubscribeUserRemoveLikeResponse;
    if (subscribeToMoreNotifications && user) {
      unsubscribeMentionUsersInPost = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.NOTIFY_MENTIONED_USERS_IN_POST,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionUsersInPost } = subscriptionData.data;
            updatedAddNotification(notifyMentionUsersInPost);
          }
        },
      });
      unsubscribeUserLikePost = subscribeToMoreNotifications({
        document: subscriptions.notificationSubscription.LIKE_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { likePostSubscription } = subscriptionData.data;
            if (likePostSubscription) {
              updatedAddNotification(likePostSubscription);

              if (personalPosts[user._id]) {
                const personalPostsByUserId = personalPosts[user._id].map(
                  (_post) => {
                    if (_post._id === likePostSubscription.post._id) {
                      let _p = { ..._post };
                      _p.likes = [
                        ..._p.likes,
                        likePostSubscription.creator._id,
                      ];
                      return _p;
                    }
                    return { ..._post };
                  }
                );
                setPersonalPosts(personalPostsByUserId);
              }
            }
          }
        },
      });
      unsubscribeUserRemoveLikePost = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.REMOVE_LIKE_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { removeLikePostSubscription } = subscriptionData.data;
            updatedRemoveNotification(removeLikePostSubscription);
          }
        },
      });
      unsubscribeRequestAddFriend = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription
            .NOTIFY_RECEIVED_REQUEST_TO_ADD_FRIEND,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const {
            notification: newNotification,
            receiver,
            sender,
          } = subscriptionData.data.notifyReceivedRequestToAddFriend;

          // push new sender to received requests to add friend cache
          setReceivedRequestsToAddFriend([
            { ...sender },
            ...receivedRequestsToAddFriend,
          ]);
          updatedAddNotification(newNotification, sender, receiver);
        },
      });
      unsubscribeAcceptRequestAddFriend = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription
            .NOTIFY_ACCEPT_REQUEST_TO_ADD_FRIEND,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const {
            notification: newNotification,
            sender,
            receiver,
          } = subscriptionData.data.notifyAcceptRequestToAddFriend;
          updatedAddNotification(newNotification, sender, receiver);
        },
      });
      unsubscribeOwnerPostReceivedUserComment = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription
            .NOTIFFY_USER_COMMENT_POST_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyUserCommentPostSubscription } = subscriptionData.data;
            updatedAddNotification(notifyUserCommentPostSubscription);
          }
        },
      });
      unsubscribeMentionedUsersInComment = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription
            .NOTIFY_MENTIONED_USERS_IN_COMMENT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionUsersInComment } = subscriptionData.data;
            updatedAddNotification(notifyMentionUsersInComment);
          }
        },
      });
      unsubscribeLikeComment = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.LIKE_COMMENT_SUBSCRIPTION,
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
        document:
          subscriptions.notificationSubscription
            .REMOVE_LIKE_COMMENT_SUBSCRIPTION,
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
        document:
          subscriptions.notificationSubscription
            .NOTIFY_USER_RESPONSE_COMMENT_SUBSCRIPTION,
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
        document:
          subscriptions.notificationSubscription
            .NOTIFY_MENTIONED_USERS_IN_RESPONSE,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionedUsersInResponse } = subscriptionData.data;
            updatedAddNotification(notifyMentionedUsersInResponse);
          }
        },
      });
      unsubscribeUserLikeResponse = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.LIKE_RESPONSE_SUBSCRIPTION,
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
        document:
          subscriptions.notificationSubscription
            .REMOVE_LIKE_RESPONSE_SUBSCRIPTION,
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
    }

    return () => {
      if (unsubscribeMentionUsersInPost) {
        unsubscribeMentionUsersInPost();
      }
      if (unsubscribeUserLikePost) {
        unsubscribeUserLikePost();
      }
      if (unsubscribeUserRemoveLikePost) {
        unsubscribeUserRemoveLikePost();
      }
      if (unsubscribeRequestAddFriend) {
        unsubscribeRequestAddFriend();
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
    };
  }, [
    countNumberNotificationsUnseen,
    subscribeToMoreNotifications,
    receivedRequestsToAddFriend,
    notifications,
    user,
  ]);
};

export default useNotificationsSubscription;
