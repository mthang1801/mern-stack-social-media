import React from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { UPDATE_USER_HAS_SEEN_NOTIFICATION } from "../../apollo/notification/notification.types";
import { removeReceivedRequestToAddFriend } from "../../apollo/contact/contact.caches";
import { AcceptButton, DenyButton } from "../Custom/CustomMaterialButton";
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
import { notificationContent } from "../../utils/notificationContent";
import {
  notificationsVar,
  userVar,
  currentPersonalUserVar,
  latestNotificationVar,
  newNotificationsVar,
} from "../../apollo/cache";
import { useThemeUI } from "theme-ui";
import { ACCEPT_REQUEST_TO_ADD_FRIEND,REJECT_REQUEST_TO_ADD_FRIEND } from "../../apollo/contact/contact.types";
import { setCurrentUser } from "../../apollo/user/user.caches";
import { setCurrentPersonalUser } from "../../apollo/user/currentPersonalUser.caches";
import {
  removeNewNotification,
  decreaseCountNumberNotificationsUnseen,
  removeNotificationItemFromNotificationsList,
  setLatestNotification,
  updateNotificationHasSeen,
  removeNotificationWhenUserRejectToAddFriend,
} from "../../apollo/notification/notification.caches";
import { moveReceivedRequestToFriend } from "../../apollo/contact/contact.caches";

const NotificationItem = ({ notification }) => {
  //Query
  const user = useReactiveVar(userVar);
  const newNotifications = useReactiveVar(newNotificationsVar);
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const latestNotification = useReactiveVar(latestNotificationVar);
  const notifications = useReactiveVar(notificationsVar);
  //Mutations

  const [updateToHasSeen] = useMutation(UPDATE_USER_HAS_SEEN_NOTIFICATION);
  const [acceptRequestToAddFriend] = useMutation(ACCEPT_REQUEST_TO_ADD_FRIEND);
  const [rejectRequestToAddFriend] = useMutation(REJECT_REQUEST_TO_ADD_FRIEND);
  const { lang } = useLanguage();
  const handleUserClickHasSeen = (notification) => {
    updateToHasSeen({ variables: { notificationId: notification._id } }).then(
      ({ data }) => {
        if (data.updateUserHasSeenNotification) {
          decreaseCountNumberNotificationsUnseen();
          updateNotificationHasSeen(notification._id);
        }
      }
    );
  };

  //function to handle when user click button request
  const updateMutationOnChange = (sender, receiver) => {
    setCurrentUser({
      ...user,
      friends: [...sender.friends],
      following: [...sender.following],
      followed: [...sender.followed],
      sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
      receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
    });
    if (currentPersonalUser && currentPersonalUser._id === receiver._id) {
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

  const onAcceptRequestToAddFriend = (e) => {
    e.preventDefault();
    e.stopPropagation();

    acceptRequestToAddFriend({
      variables: { senderId: notification.creator._id },
    })
      .then(({ data }) => {
        const {
          sender,
          receiver,
          notification,
        } = data.acceptRequestToAddFriend;
        removeNotificationItemFromNotificationsList(notification);
        moveReceivedRequestToFriend(sender);
        updateMutationOnChange(receiver, sender);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRejectRequestToAddFriend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    rejectRequestToAddFriend({
      variables: { senderId: notification.creator._id },
    }).then(({ data }) => {
      const { sender, receiver, notification } = data.rejectRequestToAddFriend;
      // when reject, receiver is current User, sender is creator
      removeReceivedRequestToAddFriend(sender);
      removeNotificationWhenUserRejectToAddFriend(notification);
      updateMutationOnChange(sender, receiver);
    }).catch(err => console.log(err));
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
