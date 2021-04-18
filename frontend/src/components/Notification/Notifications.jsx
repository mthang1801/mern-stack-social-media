import React from "react";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
const Notifications = ({notifications}) => {
   
  return (
    <LazyLoad>
      {notifications.length ? notifications.map((notification) => (
        <NotificationItem
          key={`notification-${notification._id}`}
          notifications={notifications}
          notification={notification}
        />
      )): null}
    </LazyLoad>
  );
};

const NoNotifications = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1em;
`;

export default React.memo(Notifications);
