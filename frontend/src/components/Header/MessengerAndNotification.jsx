import React, { useEffect, useState, useRef, useCallback } from 'react';

import {
  Wrapper,
  Notification,
  UnseenNotification,
  NotificationBoard,
} from './styles/Header.styles';
import { IoMdNotifications } from 'react-icons/io';
import Button from '../Controls/ButtonDefaultCircle';
import NotificationsBoard from './NotificationsBoard';
import useNotificationsSubscription from '../../hooks/useNotificationsSubscription';
import { useQuery, useReactiveVar } from '@apollo/client';
import {
  userVar,
  notificationsVar,
  countNumberOfNotificationUnseenVar,
} from '../../apollo/cache';
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
} from '../../apollo/notification/notification.types';
import { Scrollbars } from 'react-custom-scrollbars';
import FlashPopUpNotification from '../Notification/FlashPopUpNotification';
import {
  setLatestNotification,
  setNotifications,
  addNotificationsToNotifcationsList,
  setCountNumberNotificationsUnseen,
} from '../../apollo/notification/notification.caches';
import { useThemeUI } from 'theme-ui';
import constant from '../../constant/constant';
const Control = () => {
  const [openNotificationBoard, setOpenNotificationBoard] = useState(false);
  const [fetchedNotifications, setFetchedNotifications] = useState(false);
  const [loadingFetchNotifications, setLoadingFetchNotifications] =
    useState(false);
  const [loadingNotificationsMore, setLoadingNotificationsMore] =
    useState(false);
  const notificationRef = useRef(false);
  const { colorMode } = useThemeUI();
  const { refetch: fetchNumberNotificationsUnseen } = useQuery(
    FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
    { skip: true }
  );
  const { refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: 'cache-and-network',
    skip: true,
  });
  const user = useReactiveVar(userVar);
  const notifications = useReactiveVar(notificationsVar);
  const countNumberNotificationsUnseen = useReactiveVar(
    countNumberOfNotificationUnseenVar
  );

  useNotificationsSubscription();

  useEffect(() => {
    if (!countNumberNotificationsUnseen) {
      fetchNumberNotificationsUnseen()
        .then(({ data }) => {
          if (data) {
            setCountNumberNotificationsUnseen(data.countNotificationsUnseen);
          }
        })
        .catch((err) => {
          console.log(err);
          setCountNumberNotificationsUnseen(0);
        });
    }
  }, [fetchNumberNotificationsUnseen, countNumberNotificationsUnseen]);

  useEffect(() => {
    function handleClickOutsideNotificationBoard(e) {
      if (openNotificationBoard) {
        setOpenNotificationBoard(false);
      }
    }
    window.addEventListener('click', handleClickOutsideNotificationBoard);
    return () =>
      window.removeEventListener('click', handleClickOutsideNotificationBoard);
  }, [notificationRef.current, openNotificationBoard]);

  const handleClickNotification = useCallback(async () => {
    setLoadingNotificationsMore(false);
    setOpenNotificationBoard((prevStatus) => !prevStatus);
    setLatestNotification(null);
  });

  const getMoreNotifications = (e) => {
    const { target } = e;
    if (
      target.clientHeight + target.scrollTop > target.scrollHeight * 0.75 &&
      !loadingNotificationsMore
    ) {
      setLoadingNotificationsMore(true);
    }
  };
  useEffect(() => {
    let _isMounted = true;
    if (
      loadingNotificationsMore &&
      fetchNotifications &&
      notifications.length < user.notifications.length
    ) {
      const skip = notifications.length;
      const limit = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;
      fetchNotifications({ skip, limit })
        .then(({ data: { fetchNotifications } }) => {
          if (_isMounted && fetchNotifications) {
            addNotificationsToNotifcationsList(fetchNotifications);
            setLoadingNotificationsMore(false);
          }
        })
        .catch((err) => {
          setLoadingNotificationsMore(false);
        });
    }
    return () => (_isMounted = false);
  }, [loadingNotificationsMore, user, notifications, fetchNotifications]);

  useEffect(() => {}, [openNotificationBoard]);

  const onOpenNotificationBoard = () => {
    setOpenNotificationBoard(true);
  };

  useEffect(() => {
    let _isMounted = true;
    if (
      !fetchedNotifications &&
      openNotificationBoard &&
      notifications.length < constant.REACT_APP_NOTIFICATIONS_PER_PAGE
    ) {
      setLoadingFetchNotifications(true);
      fetchNotifications()
        .then(({ data }) => {
          if (data && _isMounted) {
            setNotifications(data.fetchNotifications);
          }
          setLoadingFetchNotifications(false);
          setFetchedNotifications(true);
        })
        .catch((err) => {
          console.log(err);
          setLoadingFetchNotifications(false);
          setFetchedNotifications(true);
        });
    }
    return () => (_isMounted = false);
  }, [fetchedNotifications, openNotificationBoard, notifications]);

  return (
    <Wrapper>
      <Notification ref={notificationRef}>
        <FlashPopUpNotification onClick={onOpenNotificationBoard} />
        <Button onClick={handleClickNotification}>
          <IoMdNotifications />
          {countNumberNotificationsUnseen ? (
            <UnseenNotification>
              {countNumberNotificationsUnseen}
            </UnseenNotification>
          ) : null}
        </Button>

        <NotificationBoard open={openNotificationBoard} theme={colorMode}>
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeightMin={0}
            autoHeightMax={200}
            onScroll={getMoreNotifications}
          >
            <NotificationsBoard
              notifications={notifications}
              loading={loadingFetchNotifications}
            />
          </Scrollbars>
        </NotificationBoard>
      </Notification>
    </Wrapper>
  );
};

export default Control;
