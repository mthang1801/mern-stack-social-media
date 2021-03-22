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
      user,
      notifications,
      openPopupNotification,
      countNumberNotificationsUnseen,
      receivedRequestsToAddFriend,
      currentPersonalUser,
      newNotifications
    },
  } = useQuery(GET_NOTIFICATIONS_CACHE_DATA, {
    fetchPolicy: "cache-first",
  });
  //mutations
  const {
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setOpenPopupNotification,
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

  //function to handle when subscription called
  const updateSubscriptionOnChange = (sender, receiver) => {
    setCurrentUser({
      ...user,
      friends: [...receiver.friends],
      following: [...receiver.following],
      followed: [...receiver.followed],
      sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
      receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
    });    
    if (
      currentPersonalUser &&
      currentPersonalUser._id.toString() === receiver._id.toString()
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...sender.friends],
        following: [...sender.following],
        followed: [...sender.followed],
        sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
        receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
      });
    }
  };

  useEffect(() => {
    let unsubscribePostCreated,
      unsubscribeRequestAddFriend,
      unsubscribeAcceptRequestAddFriend,
      unsubscribeRemoveFriend;
    if (subscribeToMoreNotifications && user) {
      unsubscribePostCreated = subscribeToMoreNotifications({
        document:
          subscriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
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
      if (unsubscribePostCreated) {
        unsubscribePostCreated();
      }
      if (unsubscribeRequestAddFriend) {
        unsubscribeRequestAddFriend();
      }
      if (unsubscribeAcceptRequestAddFriend) {
        unsubscribeAcceptRequestAddFriend();
      }
      if(unsubscribeRemoveFriend){
        unsubscribeRemoveFriend()
      }
    };
  }, [
    countNumberNotificationsUnseen,
    subscribeToMoreNotifications,
    receivedRequestsToAddFriend,
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
  return (
    <LazyLoad>
      {notifications.map((notification) => (
        <NotificationItem
          key={`notification-${notification._id}`}
          notifications={notifications}
          notification={notification}
          user={user}
          newNotifications={newNotifications}
          currentPersonalUser={currentPersonalUser}
          countNumberNotificationsUnseen={countNumberNotificationsUnseen}
          setNotifications={setNotifications}
          setCountNumberNotificationsUnseen={setCountNumberNotificationsUnseen}
          setCurrentUser={setCurrentUser}
          setCurrentPersonalUser={setCurrentPersonalUser}
        />
      ))}
      ;
    </LazyLoad>
  );
};

const NoNotifications = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1em;
`;

export default React.memo(Notifications);
