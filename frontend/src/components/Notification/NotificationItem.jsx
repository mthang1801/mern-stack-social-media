import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  notificationMutations,
  userMutations,
  cacheMutations,
} from "../../apollo/operations/mutations";
import {AcceptButton, DenyButton} from "../Custom/CustomMaterialButton"
import { LazyLoadImage } from "react-lazy-load-image-component";
import useLanguage from "../Global/useLanguage";
import Moment from "react-moment";
import "moment/locale/vi";
import {
  Wrapper,
  LinkWrapper,
  AvatarContainer,
  NotificationContent,
  Controls,
} from "./styles/NotificationItem.styles";
import {
  notificationContent,
  showResponseButtons,
} from "../../utils/notificationContent";
import { GET_NOTIFICATIONS_CACHE_DATA } from "../../apollo/operations/queries/cache/components/getNotifications";
import { useThemeUI } from "theme-ui";
import Button from "@material-ui/core/Button";
const NotificationItem = ({ notification }) => {
  //Query
  const {
    data: {
      user,
      newNotifications,
      currentPersonalUser,
      latestNotification,
      notifications,
    },
  } = useQuery(GET_NOTIFICATIONS_CACHE_DATA, { fetchPolicy: "cache-first" });
  //Mutations
  const {
    updateNotificationHasSeen,
    decreaseNumberNotificationsUnseen,
    setCurrentUser,
    setCurrentPersonalUser,
    removeNotificationItemFromNotificationsList,
    setLatestNotification,
    removeNewNotification,
    updateHasSeenLatestMessage,
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
    updateToHasSeen({ variables: { notificationId: notification._id } }).then(
      ({ data }) => {
        if (data.updateUserHasSeenNotification) {
          decreaseNumberNotificationsUnseen();
          updateNotificationHasSeen(notification._id);
        }
      }
    );
  };

  const updateMutationOnChange = (sender, receiver, removedNotification) => {
    if (removedNotification) {
      if (latestNotification?._id === removedNotification._id) {
        setLatestNotification(null);
      }
      removeNewNotification(removedNotification._id);
      decreaseNumberNotificationsUnseen();
      removeNotificationItemFromNotificationsList(removedNotification);
      setCurrentUser({
        ...user,
        notifications: [
          ...notifications.filter((_id) => _id !== removedNotification._id),
        ],
      });
    }
    setCurrentUser({
      ...user,
      friends: [...receiver.friends],
      followed: [...receiver.followed],
      receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
    });
    if (
      currentPersonalUser &&
      currentPersonalUser._id === notification.creator._id
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...sender.friends],
        following: [...sender.following],
        sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
      });
    }
  };

  const onAcceptRequestToAddFriend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    acceptRequestToAddFriend({
      variables: { senderId: notification.creator._id },
    }).then(({ data }) => {
      const { sender, receiver, notification } = data.acceptRequestToAddFriend;
      console.log(sender);
      console.log(receiver)
      console.log(notification)
      updateMutationOnChange(sender, receiver, notification);
    });
  };

  const onRejectRequestToAddFriend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    rejectRequestToAddFriend({
      variables: { senderId: notification.creator._id },
    }).then(({ data }) => {
      const { sender, receiver, notification } = data.rejectRequestToAddFriend;
      console.log(sender, receiver, notification);
      // when reject, receiver is current User, sender is creator
      updateMutationOnChange(sender, receiver, notification);
    });
  };
  const { colorMode } = useThemeUI();
  if (!user) return null;
  return (
    <Wrapper theme={colorMode} hasSeen={notification.hasSeen}>
      <LinkWrapper
        to={notification.url}
        key={notification._id}
        onClick={() => handleUserClickHasSeen(notification)}
      >
        <AvatarContainer>
          <LazyLoadImage
            src={`${notification.creator.avatar}`}
            alt={notification.url}
            effect="blur"
            width="40px"
            height="40px"
          />
        </AvatarContainer>
        <NotificationContent>
          <span
            dangerouslySetInnerHTML={{
              __html: notificationContent(notification, lang),
            }}
          />
          <small>
            <Moment
              fromNow
              className={newNotifications?.has(notification._id) ? "new" : ""}
              locale={lang}
            >
              {new Date(+notification.updatedAt)}
            </Moment>
          </small>
        </NotificationContent>
      </LinkWrapper>
      {notification.isQuestion && notification.questionType?.yesNoQuestion ? (
        <Controls>
          <AcceptButton
            variant="contained"
            size="small"
            color="primary"
            onClick={onAcceptRequestToAddFriend}
          >
            Accept
          </AcceptButton>
          <DenyButton
            variant="contained"
            size="small"
            color="secondary"
            onClick={onRejectRequestToAddFriend}
          >
            Reject
          </DenyButton>
        </Controls>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(NotificationItem);
