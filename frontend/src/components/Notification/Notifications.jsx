import React, { useRef, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { 
  GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_NOTIFICATIONS,
  GET_CURRENT_USER,
  GET_OPEN_POPUP_NOTIFICATION,  
  GET_CURRENT_PERSONAL_USER,
  GET_RECEIVED_REQUESTS_TO_ADD_FRIEND
} from "../../apollo/operations/queries/cache";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, 
} from "../../apollo/operations/queries/notification";
import {cacheMutations} from "../../apollo/operations/mutations";
import subcriptions from "../../apollo/operations/subscriptions";
import subscriptions from "../../apollo/operations/subscriptions";
const Notifications = () => {
  //useQuery
  const { refetch: fetchCountNumberNotificationsUnseen } = useQuery(
    FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
    {
      fetchPolicy: "network-only",
      skip: true,
    }
  );
  const {
    data: { countNumberNotificationsUnseen },
  } = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
    fetchPolicy: "cache-first",
  });
  const {   
    subscribeToMore: subscribeToMoreNotifications,
  } = useQuery(FETCH_NOTIFICATIONS, {
    skip: true,
    fetchPolicy: "cache-and-network",
  });
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { notifications },
  } = useQuery(GET_NOTIFICATIONS, { fetchPolicy: "cache-only" });
  const {
    data: { openPopupNotification },
  } = useQuery(GET_OPEN_POPUP_NOTIFICATION, { fetchPolicy: "cache-first" }); 
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  const {
    data: { receivedRequestsToAddFriend },
  } = useQuery(GET_RECEIVED_REQUESTS_TO_ADD_FRIEND, { fetchPolicy: "cache-first" });
  //mutations
  const {
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setOpenPopupNotification,      
    setCurrentUser,
    setCurrentPersonalUser,
    setReceivedRequestsToAddFriend
  } = cacheMutations;

  useEffect(() => {
    if (countNumberNotificationsUnseen === null) {
      fetchCountNumberNotificationsUnseen().then(
        ({ data: { countNotificationsUnseen } }) =>
          setCountNumberNotificationsUnseen(countNotificationsUnseen)
      );
    }
  }, [
    countNumberNotificationsUnseen,
    fetchCountNumberNotificationsUnseen,
    setCountNumberNotificationsUnseen,
  ]);

  const updatedNotifications = (
    newNotification,
    sender = null,
    receiver = null
  ) => {
    setOpenPopupNotification(true);
    setNewNotifications(newNotification._id);
    setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);
    if (sender && receiver) {
      setCurrentUser({
        ...user,
        friends: [...receiver.friends],
        following: [...receiver.following],
        followed: [...receiver.followed],
        sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
        receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
      });

      
      if (currentPersonalUser && currentPersonalUser._id === sender._id) {
        setCurrentPersonalUser({
          ...currentPersonalUser,
          friends: [...sender.friends],
          following: [...sender.following],
          followed: [...sender.followed],
          sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
          receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
        });
      }
    }

    setNotifications([{ ...newNotification, new: true }, ...notifications]);
  };

  useEffect(() => {
    let unsubscribePostCreated,
      unsubscribeRequestAddFriend,
      unsubscribeAcceptRequestAddFriend;
    if (subscribeToMoreNotifications && user) {
      unsubscribePostCreated = subscribeToMoreNotifications({
        document:
          subcriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const {
            notification: newNotification,
          } = subscriptionData.data.notifyCreatedPost;
          updatedNotifications(newNotification);
        },
      });
      unsubscribeRequestAddFriend = subscribeToMoreNotifications({
        document:
          subcriptions.notificationSubscription
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
          const filterSendersRequest = receivedRequestsToAddFriend.filter(senderRequest => senderRequest._id !== sender._id)
          setReceivedRequestsToAddFriend([{...sender}, ...filterSendersRequest])
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
      if (unsubscribePostCreated) {
        unsubscribePostCreated();
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
    notifications,     
    user,
  ]);  

  useEffect(() => {
    let timer = 0;
    timer = setTimeout(() => {
      setOpenPopupNotification(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [openPopupNotification]);  
  if (!notifications.length)
    return <NoNotifications>No notifications</NoNotifications>;
  return notifications.map((notification) => (
    <NotificationItem
      key={`notification-${notification._id}`}
      notifications={notifications}
      notification={notification}
    />
  ));
};

const NoNotifications = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1em;
`;

export default React.memo(Notifications);
