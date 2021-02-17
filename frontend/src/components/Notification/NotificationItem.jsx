import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  UPDATE_USER_HAS_SEEN_NOTIFICATION,
  default as mutations,
} from "../../apollo/operations/mutations";
import {
  GET_CURRENT_USER,
  GET_NEW_NOTIFICATIONS,
  GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN
} from "../../apollo/operations/queries";
import classNames from "classnames";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useLanguage from "../Global/useLanguage";
import Moment from "react-moment";
import notificationContent from "../../utils/notificationContent";
const NotificationItem = ({ notification, notifications }) => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  const {
    data: { newNotifications },
  } = useQuery(GET_NEW_NOTIFICATIONS, { fetchPolicy: "cache-first" });
  const {data : {countNumberNotificationsUnseen}} = useQuery(GET_COUNT_NUMBER_NOTIFICATIONS_UNSEEN, {fetchPolicy : "cache-first"})
  const { setNotifications, setCountNumberNotificationsUnseen } = mutations;
  const [updateToHasSeen] = useMutation(UPDATE_USER_HAS_SEEN_NOTIFICATION);
  const { lang } = useLanguage();
  const handleUserClickHasSeen = (notification) => {
    if (!notification.hasSeen.includes(user._id)) {
      updateToHasSeen({ variables: { notificationId: notification._id } }).then(
        (res) => {
          //set Notification again
          setNotifications(notifications.map((notificationItem) =>
            notificationItem._id.toString() === notification._id.toString()
              ? {
                  ...notificationItem,
                  hasSeen: [...notificationItem.hasSeen, user._id],
                }
              : { ...notificationItem }
          )); 
          //count number notification unseen again
          setCountNumberNotificationsUnseen(countNumberNotificationsUnseen - 1 );
        }
      );
    }
  };  
  if(!user) return null;
  return (
    <Wrapper>
      <Link
        to={notification.href}
        key={notification._id}
        className={classNames("notification-link", {
          unseen: !notification.hasSeen.includes(user._id),
        })}
        onClick={() => handleUserClickHasSeen(notification)}
      >
        <div className="avatar-container">
          <LazyLoadImage
            src={`/images/${notification.creator.avatar}`}
            alt={notification.href}
            effect="blur"
            width="40px"
            height="40px"
          />
        </div>
        <div className="notification-content">
          <span className="creator-name">{notification.creator.name} </span>
          <span>
            {notificationContent(notification.field, notification.action, lang)}
          </span>
          <div className="notification-datetime">
            <Moment
              fromNow
              className={newNotifications.has(notification._id) ? "new" : ""}
            >
              {new Date(+notification.createdAt)}
            </Moment>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .notification-link {
    display: flex;
    align-items: flex-start;
    padding: 0.6rem;
    transition: var(--mainTransition);
    &:hover {
      background-color: ${({ theme }) =>
        theme === "dark"
          ? "var(--color-background-dark)"
          : "var(--color-background-default)"};
    }
    &:last-child {
      overflow: hidden;
    }
  }
  .unseen {
    background-color: ${({ theme }) =>
      theme === "dark" ? "var(--dark)" : "var(--light)"};
  }
  .avatar-container {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .notification-content {
    font-size: 0.9rem;
  }
  .notification-datetime {
    font-size: 0.85rem;
    opacity: 0.7;
  }
  .new {
    font-weight: bold;
    color: red;
  }
  .creator-name {
    font-weight: bolder;
  }
`;

export default NotificationItem;
