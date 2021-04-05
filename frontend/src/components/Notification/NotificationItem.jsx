import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  notificationMutations,
  userMutations,
  cacheMutations,
} from "../../apollo/operations/mutations";
import classNames from "classnames";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useLanguage from "../Global/useLanguage";
import Moment from "react-moment";
import "moment/locale/vi"
import {
  notificationContent,
  showResponseButtons,
} from "../../utils/notificationContent";
import {GET_NOTIFICATIONS_CACHE_DATA} from "../../apollo/operations/queries/cache/components/getNotifications"
import { useThemeUI } from "theme-ui";
const NotificationItem = ({ notification }) => {
  //Query
  const {data : {user, newNotifications, currentPersonalUser, countNumberNotificationsUnseen, notifications}} = useQuery(GET_NOTIFICATIONS_CACHE_DATA, {fetchPolicy : "cache-first"})  
  //Mutations
  const {
    updateNotificationHasSeen,
    decreaseNumberNotificationsUnseen,
    setCurrentUser,
    setCurrentPersonalUser,
  } = cacheMutations;
  const [updateToHasSeen] = useMutation(
    notificationMutations.UPDATE_USER_HAS_SEEN_NOTIFICATION
  );
  const [acceptRequestToAddFriend] = useMutation(
    userMutations.ACCEPT_REQUEST_TO_ADD_FRIEND
  );
  const [rejectRequestToAddFriend] = useMutation(
    userMutations.REJECT_REQUEST_TO_ADD_FRIEND
  );  
  const { lang } = useLanguage();
  const handleUserClickHasSeen = (notification) => {
    updateToHasSeen({variables : {notificationId : notification._id}}).then(({data}) => {
      if(data.updateUserHasSeenNotification){
        decreaseNumberNotificationsUnseen();        
        updateNotificationHasSeen(notification._id)
      }
    })
  };

  const updateMutationOnChange = (sender, receiver) => {
    setCurrentUser({
      ...user,
      friends: [...sender.friends],
      following: [...sender.following],
      followed: [...sender.followed],
      sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
      receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
    });
    if (
      currentPersonalUser &&
      currentPersonalUser._id === notification.creator._id
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...receiver.friends],
        following: [...receiver.following],
        followed: [...receiver.followed],
        sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
        receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
      });
    }
  };

  const onAcceptRequestToAddFriend = () => {
    acceptRequestToAddFriend({
      variables: { senderId: notification.creator._id },
    }).then(({ data }) => {
      const { sender, receiver } = data.acceptRequestToAddFriend;
      updateMutationOnChange(sender, receiver);
    });
  };

  const onRejectRequestToAddFriend = () => {
    rejectRequestToAddFriend({
      variables: { senderId: notification.creator._id },
    }).then(({ data }) => {
      const { sender, receiver } = data.rejectRequestToAddFriend;
      updateMutationOnChange(sender, receiver);
    });
  };
  const { colorMode } = useThemeUI();
  if (!user) return null;
  return (
    <Wrapper theme={colorMode}>
      <div
        className={classNames("notification-item-container", {
          unseen: !notification.hasSeen,
        })}
      >
        <Link
          to={notification.url}
          key={notification._id}
          className={classNames("notification-link", {
            unseen: !notification.hasSeen,
          })}
          onClick={() => handleUserClickHasSeen(notification)}
        >
          <div className="avatar-container">
            <LazyLoadImage
              src={`${notification.creator.avatar}`}
              alt={notification.url}
              effect="blur"
              width="40px"
              height="40px"
            />
          </div>
          <div className="notification-content">            
            <span
              dangerouslySetInnerHTML={{
                __html: notificationContent(notification, lang),
              }}
            />
            <div className="notification-datetime">
              <Moment
                fromNow
                className={newNotifications?.has(notification._id) ? "new" : ""}
                locale={lang}
              >
                {new Date(+notification.updatedAt)}
              </Moment>
            </div>
          </div>
        </Link>
        {/* {showResponseButtons(notification, user) && (
          <ButtonsGroup>
            <ButtonAccept onClick={onAcceptRequestToAddFriend}>
              Accept
            </ButtonAccept>
            <ButtonDecline onClick={onRejectRequestToAddFriend}>Decline</ButtonDecline>
          </ButtonsGroup>
        )} */}
      </div>
    </Wrapper>
  );
};
const ButtonsGroup = styled.div`
  display: flex;
  padding: 1rem;
`;

const ButtonAccept = styled.button`
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  background-color: #16c172e3;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--white);
  &:hover {
    background-color: #009651e3;
  }
`;
const ButtonDecline = styled.button`
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  background-color: #ec1b1be3;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--white);
  &:hover {
    background-color: #c70000e3;
  }
`;

const Wrapper = styled.div`
  .notification-item-container:hover {
    background-color: ${({ theme }) =>
      theme === "dark"
        ? "var(--color-background-dark)"
        : "var(--color-background-default)"};
  }
  .unseen {
    background-color: ${({ theme }) =>
      theme === "dark" ? "var(--dark)" : "var(--light)"};
  }
  .notification-link {
    display: flex;
    align-items: flex-start;
    padding: 0.6rem;
    transition: var(--mainTransition);
    &:last-child {
      overflow: hidden;
    }
    &:hover {
      background-color: inherit;
    }
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

export default React.memo(NotificationItem);
