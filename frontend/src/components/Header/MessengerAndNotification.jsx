import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  Wrapper,
  Notification,
  UnseenNotification,
  NotificationBoard,
} from "./styles/Header.styles";
import { IoMdNotifications } from "react-icons/io";
import Button from "../Controls/ButtonDefaultCircle";
import NotificationsBoard from "./NotificationsBoard";
import useNotificationsPostSubscription from "../../hooks/useNotificationsPostSubscription"
import { useQuery } from "@apollo/client";
import { GET_HEADER_CACHE_DATA } from "../../apollo/operations/queries/cache";
import { FETCH_NOTIFICATIONS } from "../../apollo/operations/queries/notification";
import { cacheMutations } from "../../apollo/operations/mutations";
import { Scrollbars } from "react-custom-scrollbars";
import FlashPopUpNotification from "../Notification/FlashPopUpNotification";

const Control = () => {
  const [openNotificationBoard, setOpenNotificationBoard] = useState(false);
  const [loadingNotificationsMore, setLoadingNotificationsMore] = useState(
    false
  );    
  const notificationRef = useRef(false);  
  const { setLatestNotification, setNotifications } = cacheMutations;

  const { refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const {
    data: { user, notifications, countNumberNotificationsUnseen },
  } = useQuery(GET_HEADER_CACHE_DATA, { fetchPolicy: "cache-and-network" });

  useNotificationsPostSubscription();
  
  useEffect(() => {
    function handleClickOutsideNotificationBoard(e) {
      if (
        openNotificationBoard
      ) {
        setOpenNotificationBoard(false);
      }
    }
    window.addEventListener("click", handleClickOutsideNotificationBoard);
    return () =>
      window.removeEventListener("click", handleClickOutsideNotificationBoard);
  }, [notificationRef.current , openNotificationBoard]);


  const handleClickNotification = useCallback(async () => { 
    setLoadingNotificationsMore(false);
    setOpenNotificationBoard((prevStatus) => !prevStatus);
    setLatestNotification(null);
  });


  const getMoreNotifications = (e) => {
    const { target } = e;
    if (target.clientHeight + target.scrollTop > target.scrollHeight * 0.75) {
      setLoadingNotificationsMore(true);
    }
  };
  useEffect(() => {
    let _isMounted = true;
    if (loadingNotificationsMore && fetchNotifications) {
      const skip = notifications.length;
      const limit = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;
      fetchNotifications({ skip, limit }).then(
        ({ data: { fetchNotifications } }) => {
          if (_isMounted) {
            setNotifications([...notifications, ...fetchNotifications]);
            setLoadingNotificationsMore(false);
          }
        }
      );
    }
    return () => (_isMounted = false);
  }, [loadingNotificationsMore]);  


  const onOpenNotificationBoard = useCallback(() => {
    setOpenNotificationBoard(true);    
  },[]);

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
        {user && (
          <NotificationBoard  open={openNotificationBoard}>
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeightMin={0}
              autoHeightMax={200}
              onScroll={getMoreNotifications}
            >
              <NotificationsBoard notifications={notifications}/>
            </Scrollbars>
          </NotificationBoard>
        )}
      </Notification>
    </Wrapper>
  );
};

export default Control;
