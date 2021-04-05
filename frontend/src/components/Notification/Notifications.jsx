import React, { useEffect } from "react";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS_CACHE_DATA } from "../../apollo/operations/queries/cache";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
} from "../../apollo/operations/queries/notification";
import { cacheMutations } from "../../apollo/operations/mutations";
import subscriptions from "../../apollo/operations/subscriptions";
import LazyLoad from "react-lazyload";
const Notifications = () => {
  //useQuery
  const { refetch: fetchCountNumberNotificationsUnseen } = useQuery(
    FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
    {
      fetchPolicy: "network-only",
      skip: true,
    }
  );
  const { subscribeToMore: subscribeToMoreNotifications } = useQuery(
    FETCH_NOTIFICATIONS,
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
      latestNotification
    },
  } = useQuery(GET_NOTIFICATIONS_CACHE_DATA, {
    fetchPolicy: "cache-first",
  });
  //mutations
  const {
    setCountNumberNotificationsUnseen,
    increaseNumberNotificationsUnseen,
    decreaseNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setLatestNotification,
    setCurrentUser,
    setCurrentPersonalUser,
    setReceivedRequestsToAddFriend,
    setPersonalPosts,
    addCommentToOwnerPost,
    removeNewNotification,  
    addNotificationItemToNotificationsList,
    removeNotificationItemFromNotificationsList  
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
    increaseNumberNotificationsUnseen();
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
    addNotificationItemToNotificationsList(newNotification);
  };

  const updatedRemoveNotification = (
    removedNotification,     
  ) => {
    if(latestNotification._id === removedNotification._id){
      setLatestNotification(null);
    }
    removeNewNotification(removedNotification._id);
    decreaseNumberNotificationsUnseen();
    setCurrentUser({...user, notifications : [...notifications.filter(_id => _id !== removedNotification._id)] });    
    removeNotificationItemFromNotificationsList(removedNotification);
  }

  useEffect(() => {
    let unsubscribeMentionUsersInPost,
      unsubscribeRequestAddFriend,
      unsubscribeAcceptRequestAddFriend,
      unsubscribeUserLikePost,
      unsubscribeUserRemoveLikePost,
      unsubscribeOwnerPostReceivedUserComment,
      unsubscribeMentionUsersInComment;
    if (subscribeToMoreNotifications && user) {
      unsubscribeMentionUsersInPost = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.NOTIFY_MENTION_USERS_IN_POST,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const {
            notifyMentionUsersInPost: newNotification,
          } = subscriptionData.data;
          updatedAddNotification(newNotification);
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
        document : subscriptions.notificationSubscription.REMOVE_LIKE_POST_SUBSCRIPTION, 
        variables : {userId : user._id} , 
        updateQuery : (_, {subscriptionData}) => {
          if(subscriptionData){
            const {removeLikePostSubscription} = subscriptionData.data;
            updatedRemoveNotification(removeLikePostSubscription)
          }
        }
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
            .NOTIFY_OWNER_POST_USER_COMMENT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const {
              comment,
              notification,
            } = subscriptionData.data.notifyOwnerPostUserComment;
            updatedAddNotification(notification);
            addCommentToOwnerPost(user._id, comment);
          }
        },
      });
      unsubscribeMentionUsersInComment = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription
            .NOTIFY_MENTION_USERS_IN_COMMENT_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          if (subscriptionData) {
            const { notifyMentionUsersInComment } = subscriptionData.data;
            updatedAddNotification(notifyMentionUsersInComment);
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
      if(unsubscribeUserRemoveLikePost){
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
      if (unsubscribeMentionUsersInComment) {
        unsubscribeMentionUsersInComment();
      }
    };
  }, [
    countNumberNotificationsUnseen,
    subscribeToMoreNotifications,
    receivedRequestsToAddFriend,
    notifications,
    user,
  ]);
  if (!notifications.length)
    return <NoNotifications>No notifications</NoNotifications>;
  return (
    <LazyLoad>
      {notifications.map((notification) => (
        <NotificationItem
          key={`notification-${notification._id}`}
          notifications={notifications}
          notification={notification}
        />
      ))}
    </LazyLoad>
  );
};

const NoNotifications = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1em;
`;

export default React.memo(Notifications);
