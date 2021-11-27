import React, { memo } from 'react';
import { Wrapper, Title, Header } from './styles/NotificationsBoard.styles';
import Button from '../Controls/ButtonDefaultCircle';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useTheme } from '../../theme';
import Notifications from '../Notification/Notifications';
import NotificationItem from '../Notification/NotificationItem';
const NotificationsBoard = ({ notifications, loading }) => {
  const { theme } = useTheme();
  return (
    <Wrapper theme={theme}>
      <Header>
        <Title>Notifications</Title>
        <Button variant="outlined">
          <BiDotsHorizontalRounded />
        </Button>
      </Header>
      <section>
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
      </section>
    </Wrapper>
  );
};

export default memo(NotificationsBoard);
