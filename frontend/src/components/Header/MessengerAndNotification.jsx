import React, { useEffect, useState, useRef, memo } from "react";
import styled from "styled-components";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import Button from "../Controls/ButtonDefault";
import NotificationsBoard from "./NotificationsBoard";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { FETCH_NOTIFICATIONS, COUNT_NOTIFICATIONS_UNSEEN } from "../../apollo/operations/queries";
import subcriptions from "../../apollo/operations/subscriptions";
import { Scrollbars } from "react-custom-scrollbars";
import FlashPopUpNotification from "./FlashPopUpNotification";
const Control = ({ user }) => {  
  const [openNotificationBoard, setOpenNotificationBoard] = useState(false);
  const [newNotificationsList, setNewNotificationList] = useState(new Set());
  const { data, loading, subscribeToMore : subscribeToMoreNotifications, fetchMore } = useQuery(
    FETCH_NOTIFICATIONS,
    {
      variables: { skip : 0, limit : +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE },
    }    
  );
  const {data : countNotificationsUnseenData, subscribeToMore : subscribeToMoreCountNotificationsUnseen } = useQuery(COUNT_NOTIFICATIONS_UNSEEN, {fetchPolicy : "network-only"})
  
  const [loadingMore, setLoadingMore] = useState(false);
  const [openPopupNotification, setOpenPopupNotification] = useState(false);
  const notificationRef = useRef(false);

  useEffect(() => {
    const unsubscribePostCreated = subscribeToMoreNotifications({
      document:
        subcriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
      variables: { userId: user._id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotification =
          subscriptionData.data.notifyCreatedPost.notification;
        setOpenPopupNotification(true);

        setNewNotificationList((prevList) => prevList.add(newNotification._id));
        return {
          fetchNotifications: [
            { ...newNotification, new: true },
            ...prev.fetchNotifications,
          ],
        };
      },
    });
    const unsubscribeCountNotificationsUnseen = subscribeToMoreCountNotificationsUnseen({
      document : subcriptions.notificationSubscription.UPDATE_COUNT_NOTIFICATIONS_WHEN_SEEN_SUBSCRIPTION,
      variables : {userId : user._id},
      updateQuery : (prev, {subscriptionData}) => {
        if(subscriptionData.data && subscriptionData.data.updateCountNotificationsWhenSeen.toString() === user._id.toString()){
          return {countNotificationsUnseen : prev.countNotificationsUnseen- 1} ;
        }
      }
    }) 
    return () => {
      unsubscribePostCreated();
      unsubscribeCountNotificationsUnseen();
    }
  }, []);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setOpenPopupNotification(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [openPopupNotification]);

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
    setOpenNotificationBoard((prevStatus) => !prevStatus);
  };

  const handleClickFlashPopupNotification = () => {
    setOpenNotificationBoard(true);
    setOpenPopupNotification(false);
  };

  const handleScrollBoard = (e) => {
    const { target } = e;
    if (target.clientHeight + target.scrollTop > target.scrollHeight * 0.75) {
      setLoadingMore(true);
    }
  };

  useEffect(() => {
    if (loadingMore) {
      if (fetchMore) {
        fetchMore({
          query: FETCH_NOTIFICATIONS,
          variables: {
            skip:
              data && data.fetchNotifications.length
                ? data.fetchNotifications.length
                : 0,
            limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return {fetchNotifications : [...prev.fetchNotifications, ...fetchMoreResult.fetchNotifications]}
          },
        }).then(() => setLoadingMore(false));
      }
    }
  }, [loadingMore]);
  return (
    <Wrapper onScroll={handleScrollBoard}>
      <Button>
        <FaFacebookMessenger />
      </Button>
      <div className="notification" ref={notificationRef}>
        <Button onClick={handleClickNotification}>
          <IoMdNotifications />
          {countNotificationsUnseenData && countNotificationsUnseenData.countNotificationsUnseen ? (
            <div className="unseen-noti">{countNotificationsUnseenData.countNotificationsUnseen}</div>
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
              <NotificationsBoard
                user={user}
                notifications={data.fetchNotifications}
                newNotificationsList={newNotificationsList}
              />
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
  .flash-popup {
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 1;
    -webkit-transition: var(--mainTransition);
    transition: var(--mainTransition);
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
