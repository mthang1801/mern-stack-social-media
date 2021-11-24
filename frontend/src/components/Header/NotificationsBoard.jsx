import React, { memo } from 'react';
import {
  Wrapper,
  Title,
  Header,
  Body,
} from './styles/NotificationsBoard.styles';
import Button from '../Controls/ButtonDefaultCircle';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useThemeUI } from 'theme-ui';
import Notifications from '../Notification/Notifications';
import NotificationItem from '../Notification/NotificationItem';
const NotificationsBoard = ({ notifications, loading }) => {
  const { colorMode } = useThemeUI();
  return (
    <Wrapper theme={colorMode}>
      <Header>
        <Title>Notifications</Title>
        <Button variant="outlined">
          <BiDotsHorizontalRounded />
        </Button>
      </Header>
      <Body>
        {loading ? (
          <div>Loading</div>
        ) : notifications.length ? (
          notifications.map((notification) => (
            <NotificationItem
              key={`home-page-notification-${notification._id}`}
              notifications={notifications}
              notification={notification}
            />
          ))
        ) : (
          <div>No notifications</div>
        )}
      </Body>
    </Wrapper>
  );
};

export default memo(NotificationsBoard);
