import React from "react";
import {
  ContactItemWrapper,
  ContactInfo,
  ContactActions,
  FriendActions,
} from "./Contact.styles";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../Controls/ButtonDefault";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import { BsChatDots, BsCameraVideo } from "react-icons/bs";
import { MdStarBorder } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { setCurrentUser } from "../../apollo/user/user.caches";
import {
  moveReceivedRequestToFriend,
  removeSentRequestToAddFriend,
  removeReceivedRequestToAddFriend,
} from "../../apollo/contact/contact.caches";
import { setCurrentPersonalUser } from "../../apollo/user/currentPersonalUser.caches";
import {
  removeNotificationWhenUserRejectToAddFriend,
  removeNotificationItemFromNotificationsList,
} from "../../apollo/notification/notification.caches";
import {
  currentPersonalUserVar,
  receivedRequestsToAddFriendVar,
} from "../../apollo/cache";
import {
  REJECT_REQUEST_TO_ADD_FRIEND,
  ACCEPT_REQUEST_TO_ADD_FRIEND,
  CANCEL_REQUEST_TO_ADD_FRIEND,
} from "../../apollo/contact/contact.types";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/cache";

const ContactItem = ({ userContact, type }) => {
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const user = useReactiveVar(userVar);

  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);

  const [cancelRequestToAddFriend] = useMutation(CANCEL_REQUEST_TO_ADD_FRIEND);
  const [rejectRequestToAddFriend] = useMutation(REJECT_REQUEST_TO_ADD_FRIEND);
  const [acceptRequestToAddFriend] = useMutation(ACCEPT_REQUEST_TO_ADD_FRIEND);

  //function to handle when user click button request
  const updateMutationOnChange = (sender, receiver) => {    
    setCurrentUser({
      ...user,
      ...sender
    });
    if (currentPersonalUser && currentPersonalUser._id === receiver._id) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        ...receiver
      });
    }
  };

  //Handle cancel request to add friend
  const onCancelRequestToAddFriend = () => {
    cancelRequestToAddFriend({
      variables: { receiverId: userContact._id },
    }).then(({ data }) => {
      const { sender, receiver } = data.cancelRequestToAddFriend;
      removeSentRequestToAddFriend(receiver);
      updateMutationOnChange(sender, receiver);
    });
  };
  //Handle accept request to add friend
  const onAcceptRequestToAddFriend = () => {
    acceptRequestToAddFriend({
      variables: { senderId: userContact._id },
    }).then(({ data }) => {
      const { sender, receiver, notification } = data.acceptRequestToAddFriend;      
      //remove user at recived requests to head of friends list
      removeNotificationItemFromNotificationsList(notification);
      moveReceivedRequestToFriend(sender);
      updateMutationOnChange(receiver, sender);
    });
  };

  //Handle reject to add friend
  const onRejectRequestToAddFriend = () => {
    rejectRequestToAddFriend({
      variables: { senderId: userContact._id },
    })
      .then(({ data }) => {
        const {
          sender,
          receiver,
          notification,
        } = data.rejectRequestToAddFriend;       
        
        removeReceivedRequestToAddFriend(sender);
        removeNotificationWhenUserRejectToAddFriend(notification);
        updateMutationOnChange(receiver, sender);
      })
      .catch((err) => console.log(err));
  };

  const sentActions = (
    <Button cancel onClick={onCancelRequestToAddFriend}>
      {i18n.store.data[lang].translation.contacts.cancelRequest}
    </Button>
  );
  const receivedActions = (
    <>
      <Button acceptBtn variant="outlined" onClick={onAcceptRequestToAddFriend}>
        {i18n.store.data[lang].translation.contacts.acceptRequest}
      </Button>
      <Button reject onClick={onRejectRequestToAddFriend}>
        {i18n.store.data[lang].translation.contacts.rejectRequest}
      </Button>
    </>
  );

  const friendsActions = (
    <FriendActions>
      <Button favorite>
        <MdStarBorder />
      </Button>
      <Button chat>
        <BsChatDots />
      </Button>
      <Button call>
        <IoMdCall />
      </Button>
      <Button videocall>
        <BsCameraVideo />
      </Button>
      {/* <Button setting>
        <BsThreeDotsVertical />
      </Button>      */}
    </FriendActions>
  );
  return (
    <ContactItemWrapper theme={colorMode}>
      <ContactInfo>
        <Link to={userContact.slug}>
          <LazyLoadImage src={userContact.avatar} alt={userContact.avatar} />
        </Link>
        <Link to={userContact.slug}>
          <h6>{userContact.name}</h6>
          <span>@{userContact.slug}</span>
        </Link>
      </ContactInfo>
      <ContactActions>
        {type === "sent"
          ? sentActions
          : type === "received"
          ? receivedActions
          : type === "friends"
          ? friendsActions
          : null}
      </ContactActions>
    </ContactItemWrapper>
  );
};

export default ContactItem;
