import React, { useEffect, useState, useRef, memo } from "react";
import styled from "styled-components";
import { TiMessages } from "react-icons/ti";
import { IoMdNotifications } from "react-icons/io";
import Button from "../Controls/ButtonDefault";
import NotificationsBoard from "./NotificationsBoard";
import classNames from "classnames";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  FETCH_NOTIFICATIONS,
  FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN,
  GET_NOTIFICATIONS,  
  GET_NEW_NOTIFICATIONS
} from "../../apollo/operations/queries";
import mutations from "../../apollo/operations/mutations";
import subcriptions from "../../apollo/operations/subscriptions";
import { Scrollbars } from "react-custom-scrollbars";
import FlashPopUpNotification from "./FlashPopUpNotification";

const Control = ({ user }) => {
  // useState
  const [openNotificationBoard, setOpenNotificationBoard] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [openPopupNotification, setOpenPopupNotification] = useState(false);  
  //useLazyQuery
  const [
    fetchNotifications,
    {
      data: notificationsData,
      loading: fetchLoadingNotifications,
      subscribeToMore: subscribeToMoreNotifications,
      fetchMore,      
    },
  ] = useLazyQuery(FETCH_NOTIFICATIONS);
  const [
    fetchCountNumberNotificationsUnseen,
    { data: countNotificationsUnseenData },
  ] = useLazyQuery(FETCH_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
    fetchPolicy: "network-only",
  });
  //useQuery
  const {
    data: { countNumberNotificationsUnseen },
  } = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {
    fetchPolicy: "cache-first",
  });
  const {
    data: { notifications },
  } = useQuery(GET_NOTIFICATIONS, { fetchPolicy: "cache-first" });
  const {data : {newNotifications}} = useQuery(GET_NEW_NOTIFICATIONS, {fetchPolicy : "cache-first"})
  //mutations
  const { setCountNumberNotificationsUnseen, setNotifications, setNewNotifications } = mutations;  
  //useRef
  const notificationRef = useRef(false);

  useEffect(() => {
    if (countNumberNotificationsUnseen === null) {
      fetchCountNumberNotificationsUnseen();
    }
  }, [countNumberNotificationsUnseen, fetchCountNumberNotificationsUnseen]);

  useEffect(() => {
    if (
      countNotificationsUnseenData &&
      countNotificationsUnseenData.countNotificationsUnseen
    ) {
      setCountNumberNotificationsUnseen(
        countNotificationsUnseenData.countNotificationsUnseen
      );
    }
  }, [countNotificationsUnseenData, setCountNumberNotificationsUnseen]);

  useEffect(() => {
    if (!notifications.length && !notificationsData) {
      fetchNotifications({
        variables: {
          skip: 0,
          limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
        },
      });
    }
    if (      
      notificationsData &&
      notificationsData.fetchNotifications
    ) {
      setNotifications([...notificationsData.fetchNotifications]);
    }
   
  }, [fetchNotifications, notificationsData, notifications]);

  useEffect(() => {
    let unsubscribePostCreated;    
    if (subscribeToMoreNotifications) {
      unsubscribePostCreated = subscribeToMoreNotifications({
        document:
          subcriptions.notificationSubscription.POST_CREATED_SUBSCRIPTIONS,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newNotification =
            subscriptionData.data.notifyCreatedPost.notification;
          setOpenPopupNotification(true);
          setNewNotifications(newNotification._id)
          setCountNumberNotificationsUnseen(countNumberNotificationsUnseen + 1);

          return {
            fetchNotifications: [
              { ...newNotification, new: true },
              ...prev.fetchNotifications,
            ],
          };
        },
      });
    }

    return () => {
      if (unsubscribePostCreated) {
        unsubscribePostCreated();
      }
    };
  }, [countNumberNotificationsUnseen,subscribeToMoreNotifications]);

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
            skip: notifications.length,
            limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
           
            return {
              fetchNotifications: [
                ...notifications,
                ...fetchMoreResult.fetchNotifications,
              ],
            };
          },
        }).then(() => setLoadingMore(false));
      } else{        
        fetchNotifications({variables: {
          skip: notifications.length,
          limit: +process.env.REACT_APP_NOTIFICATIONS_PER_PAGE,
        }})
      }
    }
  }, [loadingMore, fetchLoadingNotifications]);
 
  return (
    <Wrapper onScroll={handleScrollBoard}>
      <Button>
        <TiMessages />
      </Button>
      <div className="notification" ref={notificationRef}>
        <Button onClick={handleClickNotification}>
          <IoMdNotifications />
          {countNumberNotificationsUnseen !== null ? (
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
        {notifications.length ? (
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
                notifications={notifications}
                newNotificationsList={newNotifications}
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
