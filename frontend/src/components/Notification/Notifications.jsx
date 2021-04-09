import React from "react";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../apollo/operations/queries/cache";
import LazyLoad from "react-lazyload";
import useNotificationsPostSubscription from "../../hooks/useNotificationsPostSubscription"
const Notifications = () => {
  const {
    data: { notifications },
  } = useQuery(GET_NOTIFICATIONS, {
    fetchPolicy: "cache-first",
  });
  useNotificationsPostSubscription();


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
