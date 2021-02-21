import React, { useState, useEffect, useRef } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { FaUserCheck, FaReply, FaRocket } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { CgRemoveR } from "react-icons/cg";
import {
  SEND_REQUEST_TO_ADD_FRIEND,
  REJECT_REQUEST_TO_ADD_FRIEND,
} from "../../apollo/operations/mutations";
import { useMutation } from "@apollo/client";
import mutations from "../../apollo/operations/mutations";
import Button from "../Controls/ButtonDefaultCircle";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_PERSONAL_USER,
  GET_CURRENT_USER,
  GET_PERSONAL_USERS,
} from "../../apollo/operations/queries";
import { useThemeUI } from "theme-ui";
import {
  PersonalContactContainer,
  ResponseRequests,
  DropdownResponseRequest,
} from "./PersonalHeadingContact.styles";
const PersonalContact = () => {
  const [relationship, setRelationship] = useState("stranger");
  const [openResponse, setOpenResponse] = useState(false);
  //Mutations
  const [sendRequestToAddFriend] = useMutation(SEND_REQUEST_TO_ADD_FRIEND);
  const [rejectRequestToAddFriend] = useMutation(REJECT_REQUEST_TO_ADD_FRIEND);
  const { setCurrentUser, setPersonalUsers, setCurrentPersonalUser } = mutations;
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER);
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER);
  const {
    data: { personalUsers },
  } = useQuery(GET_PERSONAL_USERS);
  const { colorMode } = useThemeUI();
  const responseRef = useRef(false);
  useEffect(() => {
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
    if (user && currentPersonalUser) {
      if (currentPersonalUser._id === user._id) {
        setRelationship("me");
      } else if (currentPersonalUser.friends.includes(user._id.toString())) {
        setRelationship("friend");
      } else {
        setRelationship("stranger");
      }
    }
  }, [user, currentPersonalUser]);

  const onSendRequestToAddFriend = (e) => {
    e.preventDefault();
    sendRequestToAddFriend({ variables: { userId: currentPersonalUser._id } })
      .then(() => {
        const newCurrentUser = {
          ...user,
          following: [...user.following, currentPersonalUser._id],
          sendRequestToAddFriend: [
            ...user.sendRequestToAddFriend,
            currentPersonalUser._id,
          ],
        };
        setCurrentUser(newCurrentUser);                 
        if(personalUsers[currentPersonalUser.slug]){    
          const receiver = personalUsers[currentPersonalUser.slug] ; 
          const updatedReceiver = {
            ...receiver, 
            followed : [...receiver.followed, user._id],
            receiveRequestToAddFriend : [
              ...receiver.receiveRequestToAddFriend,
              user._id
            ]
          }                 
          setPersonalUsers(updatedReceiver)
        }
        setCurrentPersonalUser({
          ...currentPersonalUser,
          followed : [...currentPersonalUser.followed, user._id], 
          receiveRequestToAddFriend : [
            ...currentPersonalUser.receiveRequestToAddFriend,
            user._id
          ]
        })

      })
      .catch((err) => console.log(err));
  };

  console.log(user)
  console.log(personalUsers)
  console.log(currentPersonalUser);

  const onRejectRequestToAddFriend = () => {
    rejectRequestToAddFriend({ variables: { userId: currentPersonalUser._id } })
      .then(() =>{} )
      .catch((err) => console.log(err));
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
      user.sendRequestToAddFriend.includes(
        currentPersonalUser._id.toString()
      ) ? (
        <Button theme={colorMode} title="Remove send request">
          <CgRemoveR />
        </Button>
      ) : user &&
        currentPersonalUser &&
        user.receiveRequestToAddFriend.includes(
          currentPersonalUser._id.toString()
        ) ? (
        <ResponseRequests ref={responseRef}>
          <Button theme={colorMode} title="Response the request">
            <FaReply
              onClick={() => setOpenResponse((prevState) => !prevState)}
            />
          </Button>
          <DropdownResponseRequest theme={colorMode} open={openResponse}>
            <div>
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
      <Button theme={colorMode} title="Follow">
        <FaRocket />
      </Button>
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
