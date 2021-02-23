import React, { useRef, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_NOTIFICATIONS,
  GET_LOADING_NOTIFICATIONS_MORE,
  GET_CURRENT_USER,
  GET_OPEN_POPUP_NOTIFICATION,
  GET_PERSONAL_USERS,
  GET_CURRENT_PERSONAL_USER,
} from "../../apollo/operations/queries";
import mutations from "../../apollo/operations/mutations";
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
    refetch: fetchNotifications,
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
    data: { loadingNotificationsMore },
  } = useQuery(GET_LOADING_NOTIFICATIONS_MORE, { fetchPolicy: "cache-only" });
  const {
    data: { openPopupNotification },
  } = useQuery(GET_OPEN_POPUP_NOTIFICATION, { fetchPolicy: "cache-first" });
  const {
    data: { personalUsers },
  } = useQuery(GET_PERSONAL_USERS, { fetchPolicy: "cache-first" });
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  //mutations
  const {
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setOpenPopupNotification,
    setLoadingNotificationsMore,
    setPersonalUsers,
    setCurrentUser,
    setCurrentPersonalUser,
  } = mutations;

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

  useEffect(() => {
    if (!notifications.length) {
      fetchNotifications({
        variables: {
          skip: 0,
          limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
        },
      }).then(({ data: { fetchNotifications } }) => {
        if(fetchNotifications && fetchNotifications.length){
          setNotifications([...fetchNotifications]);
        }        
      });
    }
    if (loadingNotificationsMore) {
      const skip = notifications.length;
      const limit = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;

      fetchNotifications({ skip, limit }).then(
        ({ data: { fetchNotifications } }) => {
          setNotifications([...notifications, ...fetchNotifications]);
          setLoadingNotificationsMore(false);
        }
      );
    }
  }, [
    fetchNotifications,
    notifications,
    setNotifications,
    loadingNotificationsMore,
    setLoadingNotificationsMore,
  ]);

  useEffect(() => {
    let unsubscribePostCreated,
      unsubscribeRequestAddFriend,
      unsubscribeAcceptRequestAddFriend;
    if (subscribeToMoreNotifications) {
      unsubscribePostCreated = subscribeToMoreNotifications({
        document:
          subcriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;          
          const newNotification =
            subscriptionData.data.notifyCreatedPost.notification;
          setOpenPopupNotification(true);
          setNewNotifications(newNotification._id);
          setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);
          setNotifications([
            { ...newNotification, new: true },
            ...notifications,
          ]);
        },
      });
      unsubscribeRequestAddFriend = subscribeToMoreNotifications({
        document:
          subcriptions.notificationSubscription.NOTIFY_RECEIVE_REQUEST_TO_ADD_FRIEND,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const {
            notification: newNotification,
            receivers,
            receiver,
            sender
          } = subscriptionData.data.notifyReceiveRequestToAddFriend;
          console.log(newNotification)
          setOpenPopupNotification(true);
          setNewNotifications(newNotification._id);
          setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);
          setCurrentUser({
            ...user,
            friends: [...receiver.friends],
            following: [...receiver.following],
            followed: [...receiver.followed],
            sendRequestToAddFriend: [...receiver.sendRequestToAddFriend],
            receiveRequestToAddFriend: [...receiver.receiveRequestToAddFriend],
          });
          
          if (sender && personalUsers[sender.slug]) {            
            setPersonalUsers({
              ...personalUsers[sender.slug],
              friends: [...sender.friends],
              following: [...sender.following],
              followed: [...sender.followed],
              sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
              receiveRequestToAddFriend: [...sender.receiveRequestToAddFriend],
            });            
          }
          if (
            currentPersonalUser &&
            currentPersonalUser._id === sender._id
          ) {
            setCurrentPersonalUser({
              ...currentPersonalUser,
              friends: [...sender.friends],
              following: [...sender.following],
              followed: [...sender.followed],
              sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
              receiveRequestToAddFriend: [...sender.receiveRequestToAddFriend],
            });
          }

          setNotifications([
            { ...newNotification, new: true },
            ...notifications,
          ]);
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
            receiver
          } = subscriptionData.data.notifyAcceptRequestToAddFriend;
          
          setOpenPopupNotification(true);
          setNewNotifications(newNotification._id);
          setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);          
          setCurrentUser({
            ...user,
            friends: [...receiver.friends],
              following: [...receiver.following],
              followed: [...receiver.followed],
              sendRequestToAddFriend: [...receiver.sendRequestToAddFriend],
              receiveRequestToAddFriend: [...receiver.receiveRequestToAddFriend],
          });          

          if (sender && personalUsers[sender.slug]) {           
            const updatedSenderRequest = {
              ...personalUsers[sender.slug],
              friends: [...sender.friends],
              following: [...sender.following],
              followed: [...sender.followed],
              sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
              receiveRequestToAddFriend: [...sender.receiveRequestToAddFriend],
            };
            setPersonalUsers(updatedSenderRequest);
          }
          if (
            currentPersonalUser &&
            currentPersonalUser._id === sender._id
          ) {
            setCurrentPersonalUser({
              ...currentPersonalUser,
              friends: [...sender.friends],
              following: [...sender.following],
              followed: [...sender.followed],
              sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
              receiveRequestToAddFriend: [...sender.receiveRequestToAddFriend],
            });
          }

          setNotifications([
            { ...newNotification, new: true },
            ...notifications,
          ]);
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
    personalUsers,
    setPersonalUsers,
    setNotifications,
    setCountNumberNotificationsUnseen,
    setNewNotifications,
    setOpenPopupNotification,
    user,
  ]);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setOpenPopupNotification(false);
    }, 10000);
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
