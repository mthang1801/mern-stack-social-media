import React, { useRef, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_NOTIFICATIONS,
  GET_NEW_NOTIFICATIONS,
  GET_LOADING_NOTIFICATIONS_MORE,
  GET_CURRENT_USER,
  GET_OPEN_POPUP_NOTIFICATION,
} from "../../apollo/operations/queries";
import mutations from "../../apollo/operations/mutations";
import subcriptions from "../../apollo/operations/subscriptions";
const Notifications = () => {
  //useLazyQuery
  const [
    fetchNotifications,
    {
      data: notificationsData,
      loading: fetchLoadingNotifications,
      subscribeToMore: subscribeToMoreNotifications,
      fetchMore,
    },
  ] = useLazyQuery(FETCH_NOTIFICATIONS);
  const [
    fetchCountNumberNotificationsUnseen,
    { data: countNotificationsUnseenData },
  ] = useLazyQuery(FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
    fetchPolicy: "network-only",
  });
  //useQuery
  const {
    data: { countNumberNotificationsUnseen },
  } = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
    fetchPolicy: "cache-first",
  });
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { newNotifications },
  } = useQuery(GET_NEW_NOTIFICATIONS, { fetchPolicy: "cache-first" });
  const {
    data: { notifications },
  } = useQuery(GET_NOTIFICATIONS, { fetchPolicy: "cache-only" });
  const {
    data: { loadingNotificationsMore },
  } = useQuery(GET_LOADING_NOTIFICATIONS_MORE, { fetchPolicy: "cache-only" });
  const {
    data: { openPopupNotification },
  } = useQuery(GET_OPEN_POPUP_NOTIFICATION, { fetchPolicy: "cache-first" });
  //mutations
  const {
    setCountNumberNotificationsUnseen,
    setNotifications,
    setNewNotifications,
    setOpenPopupNotification,
    setLoadingNotificationsMore,
  } = mutations;
  //useRef
  const notificationsRef = useRef(false);
  useEffect(() => {
    if (countNumberNotificationsUnseen === null) {
      fetchCountNumberNotificationsUnseen();
    }
  }, [countNumberNotificationsUnseen, fetchCountNumberNotificationsUnseen]);

  useEffect(() => {
    if (
      countNotificationsUnseenData &&
      countNotificationsUnseenData.countNotificationsUnseen
    ) {
      setCountNumberNotificationsUnseen(
        countNotificationsUnseenData.countNotificationsUnseen
      );
    }
  }, [countNotificationsUnseenData, setCountNumberNotificationsUnseen]);

  useEffect(() => {
    if (!notifications.length && !notificationsData) {
      fetchNotifications({
        variables: {
          skip: 0,
          limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
        },
      });
    }
    if (notificationsData && notificationsData.fetchNotifications) {
      setNotifications([...notificationsData.fetchNotifications]);
    }
  }, [fetchNotifications, notificationsData, notifications]);

  useEffect(() => {
    let unsubscribePostCreated;
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

          return {
            fetchNotifications: [
              { ...newNotification, new: true },
              ...prev.fetchNotifications,
            ],
          };
        },
      });
    }

    return () => {
      if (unsubscribePostCreated) {
        unsubscribePostCreated();
      }
    };
  }, [countNumberNotificationsUnseen, subscribeToMoreNotifications]);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setOpenPopupNotification(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [openPopupNotification]);

  useEffect(() => {
    if (loadingNotificationsMore) {
      if (fetchMore) {
        fetchMore({
          query: FETCH_NOTIFICATIONS,
          variables: {
            skip: notifications.length,
            limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              fetchNotifications: [
                ...notifications,
                ...fetchMoreResult.fetchNotifications,
              ],
            };
          },
        }).then(() => setLoadingNotificationsMore(false));
      } else {
        fetchNotifications({
          variables: {
            skip: notifications.length,
            limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
          },
        });
        setLoadingNotificationsMore(false);
      }
    }
  }, [loadingNotificationsMore, fetchLoadingNotifications]);

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

export default Notifications;
