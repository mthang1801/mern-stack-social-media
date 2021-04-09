import React, { useState, useEffect, useRef } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { FaUserCheck, FaReply, FaRocket } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoIosPersonAdd, IoIosRemove } from "react-icons/io";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { CgRemoveR } from "react-icons/cg";

import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { userMutations } from "../../apollo/operations/mutations";
import { cacheMutations } from "../../apollo/operations/mutations";
import Button from "../Controls/ButtonDefaultCircle";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PERSONAL_USER_CACHE_DATA } from "../../apollo/operations/queries/cache";
import { useThemeUI } from "theme-ui";
import {
  PersonalContactContainer,
  ResponseRequests,
  DropdownResponseRequest,
} from "./styles/PersonalHeadingContact.styles";
const PersonalContact = () => {
  const [relationship, setRelationship] = useState("stranger");
  const [openResponse, setOpenResponse] = useState(false);
  //Mutations
  const [sendRequestToAddFriend] = useMutation(
    userMutations.SEND_REQUEST_TO_ADD_FRIEND
  );
  const [rejectRequestToAddFriend] = useMutation(
    userMutations.REJECT_REQUEST_TO_ADD_FRIEND
  );
  const [cancelRequestToAddFriend] = useMutation(
    userMutations.CANCEL_REQUEST_TO_ADD_FRIEND
  );
  const [followUser] = useMutation(userMutations.FOLLOW_USER);
  const [unFollowUser] = useMutation(userMutations.UNFOLLOW_USER);
  const [acceptRequestToAddFriend] = useMutation(
    userMutations.ACCEPT_REQUEST_TO_ADD_FRIEND
  );
  const [removeFriend] = useMutation(userMutations.REMOVE_FRIEND);
  const { setCurrentUser, setCurrentPersonalUser } = cacheMutations;
  //user Query
  const {
    data: { user, currentPersonalUser },
  } = useQuery(GET_PERSONAL_USER_CACHE_DATA);

  //color theme
  const { colorMode } = useThemeUI();
  //useRef
  const responseRef = useRef(false);

  //function to handle when user click button request
  const updateMutationOnChange = (sender, receiver) => {
    setCurrentUser({
      ...user,
      friends: [...sender.friends],
      following: [...sender.following],
      sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
    });

    setCurrentPersonalUser({
      ...currentPersonalUser,
      friends: [...receiver.friends],
      followed: [...receiver.followed],
      receivedRequestToAddFriend: [...receiver.receivedRequestToAddFriend],
    });
  };

  useEffect(() => {
    if (!responseRef.current) {
      setOpenResponse(false);
    }
    window.addEventListener("click", (e) => {
      if (responseRef.current && !responseRef.current.contains(e.target)) {
        setOpenResponse(false);
      }
    });
    return () =>
      window.removeEventListener("click", (e) => {
        if (responseRef.current && !responseRef.current.contains(e.target)) {
          setOpenResponse(false);
        }
      });
  }, [responseRef]);

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
    sendRequestToAddFriend({ variables: { receiverId: currentPersonalUser._id } })
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
        const { sender, receiver } = data.rejectRequestToAddFriend;
        updateMutationOnChange(sender, receiver);
        setOpenResponse(false);
      })
      .catch((err) => console.log(err));
  };
  //Handle cancel request to add friend
  const onCancelRequestToAddFriend = () => {
    cancelRequestToAddFriend({
      variables: { receiverId: currentPersonalUser._id },
    }).then(({ data }) => {
      console.log(data);
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
      const { sender, receiver } = data.acceptRequestToAddFriend;
      updateMutationOnChange(sender, receiver);
      setOpenResponse(false);
    });
  };
  //handle remove friend
  const onRemoveFriend = () => {
    removeFriend({ variables: { friendId: currentPersonalUser._id } }).then(
      ({ data }) => {
        const { sender, receiver } = data.removeFriend;
        updateMutationOnChange(sender, receiver);
      }
    );
  };

  const MyActionsContact = (
    <>
      <Button theme={colorMode} title="update personal">
        <HiOutlinePencilAlt />
      </Button>
      <Button theme={colorMode} title="history actions">
        <AiOutlineMenuUnfold />
      </Button>
      <Button theme={colorMode} title="setting">
        <BsThreeDots />
      </Button>
    </>
  );

  const FriendActionsContact = (
    <>
      <Button theme={colorMode} title="remove friend" onClick={onRemoveFriend}>
        <IoIosRemove />
      </Button>
      <Button theme={colorMode} title="chat">
        <TiMessages />
      </Button>
      <Button theme={colorMode} title="friend">
        <FaUserCheck />
      </Button>
      <Button theme={colorMode} title="setting">
        <BsThreeDots />
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
          theme={colorMode}
          title="Cancel request"
          onClick={onCancelRequestToAddFriend}
        >
          <CgRemoveR />
        </Button>
      ) : user &&
        currentPersonalUser &&
        user?.receivedRequestToAddFriend?.includes(
          currentPersonalUser._id.toString()
        ) ? (
        <ResponseRequests ref={responseRef}>
          <Button theme={colorMode} title="Response the request">
            <FaReply
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
        >
          <IoIosPersonAdd />
        </Button>
      )}

      <Button theme={colorMode} title="Chat">
        <TiMessages />
      </Button>
      {user?.following?.includes(currentPersonalUser._id) ? (
        <Button
          theme={colorMode}
          title="UnFollow"
          onClick={onHandleUnfollowUser}
        >
          <RiUserUnfollowLine />
        </Button>
      ) : (
        <Button theme={colorMode} title="Follow" onClick={onHandleFollowUser}>
          <RiUserFollowLine />
        </Button>
      )}
      <Button theme={colorMode} title="Setting">
        <BsThreeDots />
      </Button>
    </>
  );
  return (
    <PersonalContactContainer>
      {relationship === "me"
        ? MyActionsContact
        : relationship === "friend"
        ? FriendActionsContact
        : StrangerActionsContact}
    </PersonalContactContainer>
  );
};

export default PersonalContact;
