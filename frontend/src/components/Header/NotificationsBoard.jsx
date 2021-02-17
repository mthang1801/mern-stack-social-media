import React, {memo} from "react";
import styled from "styled-components";
import Button from "../Controls/ButtonDefault";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useThemeUI } from "theme-ui";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useLanguage from "../Global/useLanguage";
import Moment from "react-moment";
import classNames from "classnames"
import {UPDATE_USER_HAS_SEEN_NOTIFICATION} from "../../apollo/operations/mutations"
import {useMutation} from "@apollo/client"
const NotificationsBoard = ({user, notifications, newNotificationsList }) => {
  const { colorMode } = useThemeUI();
  const { lang, i18n, t } = useLanguage();
  const [updateToHasSeen] = useMutation(UPDATE_USER_HAS_SEEN_NOTIFICATION)
  const notificationContent = (field, action, notification) => {
    if (field === "post" && action === "CREATED") {
      return notification.postCreated;
    }
  };
  
  const handleUserClickHasSeen = (notification, notificationId) => {
    if(!notification.hasSeen.includes(user._id)){
      updateToHasSeen({variables : {notificationId }})
    }
  }
  return (
    <Wrapper theme={colorMode}>
      <div className="board-header">
        <h4>Notifications</h4>
        <Button variant="outlined">
          <BiDotsHorizontalRounded />
        </Button>
      </div>
      <div className="board-body">
        {notifications.map((notification) => (
          <div
            // to={notification.href}
            key={notification._id}            
            className={classNames("notification-link", {"unseen" : !notification.hasSeen.includes(user._id) })}          
            onClick={() => handleUserClickHasSeen(notification,notification._id)}
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
                {notificationContent(
                  notification.field,
                  notification.action,                
                  i18n.store.data[lang].translation
                )}
              </span>
              <div className="notification-datetime">
                <Moment fromNow className={newNotificationsList.has(notification._id) ? "new" : ""}>{new Date(+notification.createdAt)}</Moment>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  color: inherit;
  border : 1px solid ${({ theme }) =>
  theme === "dark" ? "var(--dark)" : "var(--light)"};
  .board-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
  }
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
    &:last-child{
      overflow: hidden;
    }
  }
  .unseen{
    background-color: ${({ theme }) =>
    theme === "dark"
      ? "var(--dark)"
      : "var(--light)"};
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
  .new{
    font-weight: bold;
    color : red;  
  }
  .creator-name{
    font-weight : bolder;
  }
`;

export default memo(NotificationsBoard);
