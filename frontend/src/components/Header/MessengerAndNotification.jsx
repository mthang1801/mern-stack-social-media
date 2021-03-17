import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import styled from "styled-components";
import { TiMessages } from "react-icons/ti";
import { IoMdNotifications } from "react-icons/io";
import Button from "../Controls/ButtonDefaultCircle";
import NotificationsBoard from "./NotificationsBoard";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import {  
  GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_OPEN_POPUP_NOTIFICATION,
  GET_NOTIFICATIONS,
  GET_CURRENT_USER,
} from "../../apollo/operations/queries/cache";
import { FETCH_NOTIFICATIONS } from "../../apollo/operations/queries/notification";
import { cacheMutations } from "../../apollo/operations/mutations";
import { Scrollbars } from "react-custom-scrollbars";
import FlashPopUpNotification from "./FlashPopUpNotification";

const Control = () => {
  const [openNotificationBoard, setOpenNotificationBoard] = useState(false);
  const [loadingNotificationsMore, setLoadingNotificationsMore] = useState(
    false
  );
  const notificationRef = useRef(false);
  const { setOpenPopupNotification, setNotifications } = cacheMutations;
  const {
    data: { countNumberNotificationsUnseen },
  } = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
    fetchPolicy: "cache-first",
  });

  const {
    data: { notifications },
  } = useQuery(GET_NOTIFICATIONS, {
    fetchPolicy: "cache-first",
  });
  const { refetch: fetchNotifications } = useQuery(FETCH_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const {
    data: { openPopupNotification },
  } = useQuery(GET_OPEN_POPUP_NOTIFICATION, { fetchPolicy: "cache-first" });
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  useEffect(() => {
    function handleClickOutsideNotificationBoard(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpenNotificationBoard(false);
      }
    }
    window.addEventListener("click", (e) => {
      handleClickOutsideNotificationBoard(e);
    });
    return () =>
      window.removeEventListener("click", (e) => {
        handleClickOutsideNotificationBoard(e);
      });
  }, []);

  const handleClickNotification = useCallback(async () => {    
    if (notifications.length <  +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE) {  
      console.log("fetch notifications")           
      const skip = notifications.length;
      const limit = +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE;
      fetchNotifications({ skip, limit }).then(
        ({ data: { fetchNotifications } }) => {
          setNotifications([...notifications, ...fetchNotifications]);
          setLoadingNotificationsMore(false);
        }
      );
    }    
    setOpenNotificationBoard((prevStatus) => !prevStatus);
  });
  
  const handleClickFlashPopupNotification =  () => {       
    handleClickNotification();
    setOpenPopupNotification(false);
  };

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
          if(_isMounted){
            setNotifications([...notifications, ...fetchNotifications]);
            setLoadingNotificationsMore(false);
          }          
        }
      );
    }
    return () => _isMounted = false;
  }, [loadingNotificationsMore]);
  return (
    <Wrapper>
      <Button>
        <TiMessages />
      </Button>
      <div className="notification" ref={notificationRef}>
        <Button onClick={handleClickNotification}>
          <IoMdNotifications />
          {countNumberNotificationsUnseen ? (
            <div className="unseen-noti">{countNumberNotificationsUnseen}</div>
          ) : null}
        </Button>

        <div
          className={classNames("flash-popup", {
            "open-flash-popup": openPopupNotification,
          })}
          onClick={handleClickFlashPopupNotification}
        >
          <FlashPopUpNotification />
        </div>

        {user && (
          <div
            className={classNames("notification-board", {
              "open-board": openNotificationBoard,
            })}
          >
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeightMin={0}
              autoHeightMax={200}
              onScroll={getMoreNotifications}
            >
              <NotificationsBoard />
            </Scrollbars>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  button:not(:last-child) {
    margin-right: 0.5rem;
  }
  .notification {
    position: relative;
  }
  .unseen-noti {
    position: absolute;
    top: -20%;
    right: -15%;
    background-color: var(--red);
    padding: 0.15rem 0.4rem;
    color: white;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    font-weight: bolder;
  }
  .notification-board {
    position: absolute;
    top: 125%;
    right: -100%;
    z-index: 1;
    transition: var(--mainTransition);
    width: 350px;
    height: 0;
    overflow-y: auto;
    visibility: hidden;
    opacity: 0;
  }
  .open-board {
    height: 70vh;
    visibility: visible;
    opacity: 1;
  }
  .flash-popup {
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 1;    
    cursor: pointer;  
    transform: translateX(200%);
    transition: 0.5s all;
  }
  .open-flash-popup {
    transform: translateX(0);
    transition: 0.5s all;   
  }
`;

export default memo(Control);
