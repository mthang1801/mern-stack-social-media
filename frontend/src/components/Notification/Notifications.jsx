import React from 'react';
import NotificationItem from './NotificationItem';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
const Notifications = ({ notifications }) => {
  return (
    <LazyLoad>
      {notifications.length
        ? notifications.map((notification) => (
            <NotificationItem
              key={`notification-${notification._id}`}
              notifications={notifications}
              notification={notification}
            />
          ))
        : null}
    </LazyLoad>
  );
};

export default React.memo(Notifications);
