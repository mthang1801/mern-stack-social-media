import React, { useEffect, useState, useRef, memo } from "react";
import styled from "styled-components";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import Button from "../Controls/ButtonDefault";
import NotificationsBoard from "./NotificationsBoard";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { FETCH_NOTIFICATIONS } from "../../apollo/operations/queries";
import subcriptions from "../../apollo/operations/subscriptions";
import { Scrollbars } from "react-custom-scrollbars";
import FlashPopUpNotification from "./FlashPopUpNotification";
const Control = ({ user }) => {
  const [countUnseenNotification, setCountUnseenNotification] = useState(0);
  const [openNotificationBoard, setOpenNotificationBoard] = useState(false);
  const [newNotificationsList, setNewNotificationList] = useState(new Set()) ; 
  const { data, subscribeToMore } = useQuery(FETCH_NOTIFICATIONS, {
    variables: { userId: user._id },
  });
  const [openPopupNotification, setOpenPopupNotification] = useState(false);
  const notificationRef = useRef(false);

  useEffect(() => {
    subscribeToMore({
      document:
        subcriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
      variables: { userId: user._id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotification = subscriptionData.data.notifyCreatedPost.notification;
        setOpenPopupNotification(true);
        
        setNewNotificationList(prevList => prevList.add(newNotification._id));
        return {
          fetchNotifications: [
            { ...newNotification, new : true },
            ...prev.fetchNotifications,
          ],
        };
      },
    });
  }, []);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setOpenPopupNotification(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [openPopupNotification]);

  useEffect(() => {
    if (data && data.fetchNotifications.length) {
      setCountUnseenNotification(
        data.fetchNotifications.reduce(
          (acc, notification) => (!notification.hasSeen ? (acc += 1) : acc),
          0
        )
      );
    }
  }, [data]);
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

  const handleClickNotification = () => {
    setOpenNotificationBoard((prevStatus) => !prevStatus)   
  }

  const handleClickFlashPopupNotification = () => {
    setOpenNotificationBoard(true);
    setOpenPopupNotification(false);
  }
  return (
    <Wrapper>
      <Button>
        <FaFacebookMessenger />
      </Button>
      <div className="notification" ref={notificationRef}>
        <Button
          onClick={handleClickNotification}
        >
          <IoMdNotifications />
          {countUnseenNotification ? (
            <div className="unseen-noti">{countUnseenNotification}</div>
          ) : null}
        </Button>

        <div
          className={classNames("flash-popup" , {"open-flash-popup": openPopupNotification})}
          onClick={handleClickFlashPopupNotification}
        >          
          <FlashPopUpNotification />          
        </div>
        {data ? (
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
            >
              <NotificationsBoard notifications={data.fetchNotifications} newNotificationsList={newNotificationsList}/>
            </Scrollbars>            
          </div>
        ) : null}
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
  .flash-popup{
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 1;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition); 
    cursor : pointer;
    transform : translateX(200%);
    transition: 0.5s all;
  }
  .open-flash-popup{
    transform : translateX(0);
    transition: 0.5s all;
  }
`;

export default memo(Control);
