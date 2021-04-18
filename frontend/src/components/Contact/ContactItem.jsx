import React, { useEffect } from "react";
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
import { BsChatDots, BsCameraVideo, BsThreeDotsVertical } from "react-icons/bs";
import { MdStarBorder } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import {setCurrentUser} from "../../apollo/user/user.caches"
import {  
  GET_CURRENT_PERSONAL_USER,
  GET_SENT_REQUESTS_TO_ADD_FRIEND,
  GET_RECEIVED_REQUESTS_TO_ADD_FRIEND,
  GET_FRIENDS,
} from "../../apollo/operations/queries/cache";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import {
  REJECT_REQUEST_TO_ADD_FRIEND,
  ACCEPT_REQUEST_TO_ADD_FRIEND,
  CANCEL_REQUEST_TO_ADD_FRIEND,
} from "../../apollo/user/user.types";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {userVar} from "../../apollo/cache"

const ContactItem = ({ userContact, type }) => {
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const user = useReactiveVar(userVar);
  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-first" });
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  const {
    data: { sentRequestsToAddFriend },
  } = useQuery(GET_SENT_REQUESTS_TO_ADD_FRIEND, { fetchPolicy: "cache-first" });
  const {
    data: { receivedRequestsToAddFriend },
  } = useQuery(GET_RECEIVED_REQUESTS_TO_ADD_FRIEND, {
    fetchPolicy: "cache-first",
  });
  const [cancelRequestToAddFriend] = useMutation(CANCEL_REQUEST_TO_ADD_FRIEND);
  const [rejectRequestToAddFriend] = useMutation(REJECT_REQUEST_TO_ADD_FRIEND);
  const [acceptRequestToAddFriend] = useMutation(ACCEPT_REQUEST_TO_ADD_FRIEND);
  const {    
    setCurrentPersonalUser,
    setReceivedRequestsToAddFriend,
    setSentRequestsToAddFriend,
    setFriends,
  } = cacheMutations;

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
    if (currentPersonalUser && currentPersonalUser._id === userContact._id) {
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

  //Handle cancel request to add friend
  const onCancelRequestToAddFriend = () => {
    const filterUsersReceivedRequest = sentRequestsToAddFriend.filter(
      (userReceivedRequest) => userReceivedRequest._id !== userContact._id
    );
    cancelRequestToAddFriend({
      variables: { receiverId: userContact._id },
    }).then(({ data }) => {
      const { sender, receiver } = data.cancelRequestToAddFriend;
      setSentRequestsToAddFriend(filterUsersReceivedRequest);
      updateMutationOnChange(sender, receiver);
    });
  };
  //Handle accept request to add friend
  const onAcceptRequestToAddFriend = () => {
    const filterUsersSentRequest = receivedRequestsToAddFriend.filter(
      (userSentRequest) => userSentRequest._id !== userContact._id
    );
    acceptRequestToAddFriend({
      variables: { senderId: userContact._id },
    }).then(({ data }) => {
      const { sender, receiver } = data.acceptRequestToAddFriend;
      //remove user at recived requests to head of friends list
      setReceivedRequestsToAddFriend(filterUsersSentRequest);
      setFriends([{ ...userContact }, ...friends]);
      updateMutationOnChange(sender, receiver);
    });
  };

  //Handle reject to add friend
  const onRejectRequestToAddFriend = () => {
    const filterUsersSentRequest = receivedRequestsToAddFriend.filter(
      (userSentRequest) => userSentRequest._id !== userContact._id
    );

    rejectRequestToAddFriend({
      variables: { senderId: userContact._id },
    })
      .then(({ data }) => {
        const { sender, receiver } = data.rejectRequestToAddFriend;
        setReceivedRequestsToAddFriend(filterUsersSentRequest);
        updateMutationOnChange(sender, receiver);
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
