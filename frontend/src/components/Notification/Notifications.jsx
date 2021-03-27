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
    },
  } = useQuery(GET_NOTIFICATIONS_CACHE_DATA, {
    fetchPolicy: "cache-first",
  });
  //mutations
  const {
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setLatestNotification,
    setCurrentUser,
    setCurrentPersonalUser,
    setReceivedRequestsToAddFriend,
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
  const updatedNotifications = (
    newNotification,
    sender = null,
    receiver = null
  ) => {
    setLatestNotification(newNotification);
    setNewNotifications(newNotification._id);
    setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);        
    if (sender && receiver) {
      setCurrentUser({
        // ...user,
        // friends: [...receiver.friends],
        // following: [...receiver.following],
        // followed: [...receiver.followed],
        // sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
        // receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
        ...receiver
      });

      if (currentPersonalUser && currentPersonalUser._id === sender._id) {
        setCurrentPersonalUser({
          // ...currentPersonalUser,
          // friends: [...sender.friends],
          // following: [...sender.following],
          // followed: [...sender.followed],
          // sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
          // receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
          ...sender
        });
      }
    }

    setNotifications([{ ...newNotification, new: true }, ...notifications]);
  };

  useEffect(() => {
    let unsubscribeMentionUsersInPost,
      unsubscribeRequestAddFriend,
      unsubscribeAcceptRequestAddFriend;
    if (subscribeToMoreNotifications && user) {
      unsubscribeMentionUsersInPost = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.NOTIFY_MENTION_USERS_IN_POST,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const {notifyMentionUsersInPost : newNotification} = subscriptionData.data;
          console.log(newNotification)
          updatedNotifications(newNotification);
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
          updatedNotifications(newNotification, sender, receiver);
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
          updatedNotifications(newNotification, sender, receiver);
        },
      });
    }

    return () => {
      if (unsubscribeMentionUsersInPost) {
        unsubscribeMentionUsersInPost();
      }
      if (unsubscribeRequestAddFriend) {
        unsubscribeRequestAddFriend();
      }
      if (unsubscribeAcceptRequestAddFriend) {
        unsubscribeAcceptRequestAddFriend();
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
