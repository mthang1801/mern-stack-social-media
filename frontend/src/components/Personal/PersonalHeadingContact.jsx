import React, { useState, useEffect, useRef } from "react";

import {
  AiOutlineUnorderedList,
  AiOutlineEdit,
  AiOutlineUsergroupDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  BsThreeDots,
  BsExclamationSquare,
  BsQuestionSquare,
} from "react-icons/bs";
import { BiUserVoice, BiBlock } from "react-icons/bi";

import { FiUserX, FiUsers, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { IoMdUndo } from "react-icons/io";

import { FcCheckmark, FcCancel } from "react-icons/fc";
import { setCurrentPersonalUser } from "../../apollo/user/currentPersonalUser.caches";
import {
  ACCEPT_REQUEST_TO_ADD_FRIEND,
  SEND_REQUEST_TO_ADD_FRIEND,
  REJECT_REQUEST_TO_ADD_FRIEND,
  CANCEL_REQUEST_TO_ADD_FRIEND,
  FOLLOW_USER,
  UNFOLLOW_USER,
  REMOVE_FRIEND,
} from "../../apollo/user/user.types";
import Button from "@material-ui/core/Button";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";

import {
  dialogVar,
  notificationsVar,
  latestNotificationVar,
  userVar,
  currentPersonalUserVar,
} from "../../apollo/cache";
import { useThemeUI } from "theme-ui";
import {
  PersonalContactContainer,
  ResponseRequests,
  DropdownResponseRequest,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "./styles/PersonalHeadingContact.styles";
import { setCurrentUser } from "../../apollo/user/user.caches";
import {
  setAlertDialog,
  clearAlertDialog,
} from "../../apollo/controls/controls.caches";
import {
  removeNewNotification,
  decreaseCountNumberNotificationsUnseen,
  removeNotificationItemFromNotificationsList,
  setLatestNotification,
} from "../../apollo/notification/notification.caches";
const PersonalContact = ({user}) => {
  const [relationship, setRelationship] = useState("stranger");
  const [openResponse, setOpenResponse] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openUserInteraction, setOpenUserInteraction] = useState(false);
  const dialog = useReactiveVar(dialogVar);
  const notifications = useReactiveVar(notificationsVar);
  const latestNotification = useReactiveVar(latestNotificationVar);  
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  //Mutations
  const [sendRequestToAddFriend] = useMutation(SEND_REQUEST_TO_ADD_FRIEND);
  const [rejectRequestToAddFriend] = useMutation(REJECT_REQUEST_TO_ADD_FRIEND);
  const [cancelRequestToAddFriend] = useMutation(CANCEL_REQUEST_TO_ADD_FRIEND);
  const [followUser] = useMutation(FOLLOW_USER);
  const [unFollowUser] = useMutation(UNFOLLOW_USER);
  const [acceptRequestToAddFriend] = useMutation(ACCEPT_REQUEST_TO_ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  //color theme
  const { colorMode } = useThemeUI();
  //useRef
  const responseRef = useRef(false);
  const settingRef = useRef(false);
  const interactionRef = useRef(false);
  //track dialog
  console.log(dialog)
  useEffect(() => {
    if (
      dialog &&
      dialog?.data?.type === "remove contact" &&
      dialog?.data?.userId === currentPersonalUser._id &&
      dialog?.agree
    ) {      
      removeFriend({ variables: { friendId: currentPersonalUser._id } })
        .then(({ data }) => {
          clearAlertDialog();
          const { sender, receiver, notification } = data.removeFriend;
          updateMutationOnChange(sender, receiver, notification);
          
        }).catch(err => clearAlertDialog());
        
    }
  }, [dialog, currentPersonalUser]);
  //function to handle when user click button request
  const updateMutationOnChange = (sender, receiver, removedNotification) => {
    if (
      removedNotification &&
      user.notifications.includes(removedNotification._id)
    ) {
      if (latestNotification?._id === removedNotification._id) {
        setLatestNotification(null);
      }
      removeNewNotification(removedNotification._id);
      decreaseCountNumberNotificationsUnseen();
      removeNotificationItemFromNotificationsList(removedNotification);
      setCurrentUser({
        ...user,
        notifications: [
          ...notifications.filter((_id) => _id !== removedNotification._id),
        ],
        friends: [...sender.friends],
        following: [...sender.following],
        followed: [...sender.followed],
        sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
        receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
      });
    } else {
      setCurrentUser({
        ...user,
        friends: [...sender.friends],
        following: [...sender.following],
        followed: [...sender.followed],
        sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
        receivedRequestToAddFriend: [...sender.receivedRequestToAddFriend],
      });
    }
    if (currentPersonalUser?._id === receiver._id) {
     
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...receiver.friends],
        followed: [...receiver.followed],
        following: [...receiver.following],
        receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
        sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
      });
    }
  };
  console.log(user)
  //track user click event
  useEffect(() => {
    function trackUserClickEvent(e) {
      if (
        responseRef.current &&
        !responseRef.current.contains(e.target) &&
        openResponse
      ) {
        setOpenResponse(false);
      }
      if (
        settingRef.current &&
        !settingRef.current.contains(e.target) &&
        openSettings
      ) {
        setOpenSettings(false);
      }
      if (
        interactionRef.current &&
        !interactionRef.current.contains(e.target) &&
        openUserInteraction
      ) {
        setOpenUserInteraction(false);
      }
    }
    window.addEventListener("click", trackUserClickEvent);
    return () => window.removeEventListener("click", trackUserClickEvent);
  });

  useEffect(() => {
    if (currentPersonalUser) {
      if (user && currentPersonalUser._id === user._id) {
        setRelationship("me");
      } else if (
        user &&
        currentPersonalUser.friends.includes(user._id.toString())
      ) {
        setRelationship("friend");
      } else {
        setRelationship("stranger");
      }
    }
  }, [user, currentPersonalUser]);
  // Handle add friend
  const onSendRequestToAddFriend = (e) => {
    sendRequestToAddFriend({
      variables: { receiverId: currentPersonalUser._id },
    })
      .then(({ data }) => {
        const { sender, receiver } = data.sendRequestToAddFriend;
        updateMutationOnChange(sender, receiver);
      })
      .catch((err) => console.log(err));
  };
  //Handle reject to add friend
  const onRejectRequestToAddFriend = () => {
    rejectRequestToAddFriend({
      variables: { senderId: currentPersonalUser._id },
    })
      .then(({ data }) => {
        const {
          sender,
          receiver,
          notification,
        } = data.rejectRequestToAddFriend;
        updateMutationOnChange(receiver, sender, notification);
        setOpenResponse(false);
      })
      .catch((err) => console.log(err));
  };
  //Handle cancel request to add friend
  const onCancelRequestToAddFriend = () => {
    cancelRequestToAddFriend({
      variables: { receiverId: currentPersonalUser._id },
    }).then(({ data }) => {
      const { sender, receiver } = data.cancelRequestToAddFriend;
      updateMutationOnChange(sender, receiver);
    });
  };
  //Handle Follow User
  const onHandleFollowUser = () => {
    followUser({ variables: { userId: currentPersonalUser._id } }).then(
      ({ data }) => {
        const { sender, receiver } = data.followUser;
        updateMutationOnChange(sender, receiver);
      }
    );
  };
  //Handle Unfollow user
  const onHandleUnfollowUser = () => {
    unFollowUser({ variables: { userId: currentPersonalUser._id } }).then(
      ({ data }) => {
        const { sender, receiver } = data.unFollowUser;
        updateMutationOnChange(sender, receiver);
      }
    );
  };
  //Handle accept request to add friend
  const onAcceptRequestToAddFriend = () => {
    acceptRequestToAddFriend({
      variables: { senderId: currentPersonalUser._id },
    }).then(({ data }) => {
      const { sender, receiver, notification } = data.acceptRequestToAddFriend;
      updateMutationOnChange(receiver, sender, notification);
      setOpenResponse(false);
    });
  };
  //handle remove friend
  const onRemoveFriend = () => {
    removeFriend({ variables: { friendId: currentPersonalUser._id } }).then(
      ({ data }) => {
        const { sender, receiver, notification } = data.removeFriend;
        updateMutationOnChange(sender, receiver, notification);
      }
    );
  };

  const MyActionsContact = (
    <>
      <Button size="large" theme={colorMode} title="update personal">
        <AiOutlineEdit />
      </Button>
      <Button size="large" theme={colorMode} title="history actions">
        <AiOutlineUnorderedList />
      </Button>
    </>
  );
  const FriendActionsContact = (
    <>
      <Button size="large" theme={colorMode} title="chat">
        <RiMessengerLine />
      </Button>
    </>
  );
  const StrangerActionsContact = (
    <>
      {user &&
      currentPersonalUser &&
      user?.sentRequestToAddFriend?.includes(
        currentPersonalUser._id.toString()
      ) ? (
        <Button
          size="large"
          theme={colorMode}
          title="Cancel request"
          onClick={onCancelRequestToAddFriend}
        >
          <IoMdUndo />
        </Button>
      ) : user &&
        currentPersonalUser &&
        user?.receivedRequestToAddFriend?.includes(
          currentPersonalUser._id.toString()
        ) ? (
        <ResponseRequests ref={responseRef}>
          <Button size="large" theme={colorMode} title="Response the request">
            <BsQuestionSquare
              onClick={() => setOpenResponse((prevState) => !prevState)}
            />
          </Button>
          <DropdownResponseRequest theme={colorMode} open={openResponse}>
            <div onClick={onAcceptRequestToAddFriend}>
              <FcCheckmark /> Accept
            </div>
            <div onClick={onRejectRequestToAddFriend}>
              <FcCancel /> Reject
            </div>
          </DropdownResponseRequest>
        </ResponseRequests>
      ) : (
        <Button
          theme={colorMode}
          title="add friend"
          onClick={onSendRequestToAddFriend}
          size="large"
        >
          <FiUserPlus />
        </Button>
      )}

      <Button size="large" theme={colorMode} title="Chat">
        <RiMessengerLine />
      </Button>
    </>
  );

  const onClickRemoveFriend = () => {
    setAlertDialog({
      title: `Remove friend`,
      content: `Are you sure to remove ${currentPersonalUser?.name}`,
      data: { type: "remove contact", userId: currentPersonalUser._id },
    });
  };

  const UserInteraction = (
    <Dropdown ref={interactionRef}>
      <Button
        size="large"
        title={
          user.friends.includes(currentPersonalUser._id)
            ? "Friend"
            : user.following.includes(currentPersonalUser._id)
            ? "Following"
            : "Follow"
        }
        onClick={() => setOpenUserInteraction((prevState) => !prevState)}
      >
        {user.friends.includes(currentPersonalUser._id) ? (
          <FiUserCheck />
        ) : user.following.includes(currentPersonalUser._id) ? (
          <FiUsers />
        ) : (
          <AiOutlineEye />
        )}
      </Button>
      {openUserInteraction && (
        <DropdownMenu>
          {user.following.includes(currentPersonalUser?._id) ? (
            <DropdownItem theme={colorMode} onClick={onHandleUnfollowUser}>
              <span>
                <AiOutlineEyeInvisible />
              </span>
              <span>Unfollow</span>
            </DropdownItem>
          ) : (
            <DropdownItem theme={colorMode} onClick={onHandleFollowUser}>
              <span>
                <AiOutlineEye />
              </span>
              <span>Follow</span>
            </DropdownItem>
          )}

          {user.friends.includes(currentPersonalUser?._id) && (
            <DropdownItem theme={colorMode} onClick={onClickRemoveFriend}>
              <span>
                <FiUserX />
              </span>
              <span>Remove Friend</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      )}
    </Dropdown>
  );

  const UserSettings = (
    <Dropdown ref={settingRef}>
      <Button
        size="large"
        title="Setting"
        onClick={() => setOpenSettings((prevState) => !prevState)}
      >
        <BsThreeDots />
      </Button>
      {openSettings ? (
        <DropdownMenu theme={colorMode}>
          <DropdownItem theme={colorMode}>
            <span>
              <BsExclamationSquare />
            </span>
            <span>Find Report</span>
          </DropdownItem>
          <DropdownItem theme={colorMode}>
            <span>
              <BiBlock />
            </span>
            <span>Block</span>
          </DropdownItem>
        </DropdownMenu>
      ) : null}
    </Dropdown>
  );

  return (
    <PersonalContactContainer>
      {relationship === "me"
        ? MyActionsContact
        : relationship === "friend"
        ? FriendActionsContact
        : StrangerActionsContact}
      {UserInteraction}
      {UserSettings}
    </PersonalContactContainer>
  );
};

export default PersonalContact;
