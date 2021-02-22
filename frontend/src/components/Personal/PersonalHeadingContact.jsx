import React, { useState, useEffect, useRef } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { FaUserCheck, FaReply, FaRocket } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { CgRemoveR } from "react-icons/cg";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import {
  SEND_REQUEST_TO_ADD_FRIEND,
  REJECT_REQUEST_TO_ADD_FRIEND,
  CANCEL_REQUEST_TO_ADD_FRIEND,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../../apollo/operations/mutations";
import subscriptions from "../../apollo/operations/subscriptions";
import mutations from "../../apollo/operations/mutations";
import Button from "../Controls/ButtonDefaultCircle";
import { useQuery, useMutation } from "@apollo/client";
import {
  FETCH_CURRENT_USER,
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
  const [cancelRequestToAddFriend] = useMutation(CANCEL_REQUEST_TO_ADD_FRIEND);
  const [followUser] = useMutation(FOLLOW_USER);
  const [unFollowUser] = useMutation(UNFOLLOW_USER);
  const {
    setCurrentUser,
    setPersonalUsers,
    setCurrentPersonalUser,
  } = mutations;
  //user Query
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER);
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER);
  const {
    data: { personalUsers },
  } = useQuery(GET_PERSONAL_USERS);
  const {
    refetch: fetchCurrentUser,
    subscribeToMore: subscribeUser,
  } = useQuery(FETCH_CURRENT_USER, { skip: true });

  //color theme
  const { colorMode } = useThemeUI();
  //useRef
  const responseRef = useRef(false);

  // Because I can't useSubscription to catch reject request event
  // I temporarily use fetch any thing which is available in fetch apollo has been defined before
  useEffect(() => {
    // so  I define fetchCurrentUser or any other, it is no mean exclude as following apollo, it is required to call it
    fetchCurrentUser();
  }, []);

  //Subscribe
  useEffect(() => {
    let unsubscribeUser;
    if (subscribeUser && user) {
      unsubscribeUser = subscribeUser({
        document:
          subscriptions.userSubscription
            .REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.rejectRequestToAddFriendSubscription;
          if (sender && receiver) {
            setCurrentUser({
              ...user,
              sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
            });
            if (personalUsers[receiver.slug]) {
              const updatedReceiver = {
                ...personalUsers[receiver.slug],
                receiveRequestToAddFriend: [
                  ...receiver.receiveRequestToAddFriend,
                ],
              };
              setPersonalUsers(updatedReceiver);
            }
            if (
              currentPersonalUser._id.toString() === receiver._id.toString()
            ) {
              setCurrentPersonalUser({
                ...currentPersonalUser,
                receiveRequestToAddFriend: [
                  ...receiver.receiveRequestToAddFriend,
                ],
              });
            }
          }
        },
      });

      unsubscribeUser = subscribeUser({
        document:
          subscriptions.userSubscription
            .CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (prev, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.cancelRequestToAddFriendSubscription;
          if (sender && receiver) {
            setCurrentUser({
              ...user,
              receiveRequestToAddFriend: [
                ...receiver.receiveRequestToAddFriend,
              ],
              followed: [...receiver.followed],
            });
            if (personalUsers[sender.slug]) {
              setPersonalUsers({
                ...personalUsers[sender.slug],
                sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
                following: [...sender.following],
              });
            }
            if (currentPersonalUser._id.toString() === sender._id.toString()) {
              setCurrentPersonalUser({
                ...currentPersonalUser,
                sendRequestToAddFriend: [...sender.sendRequestToAddFriend],
                following: [...sender.following],
              });
            }
          }
        },
      });
    }
    return () => {
      if (unsubscribeUser) {
        unsubscribeUser();
      }
    };
  }, [subscribeUser, user]);

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
  // Handle add friend
  const onSendRequestToAddFriend = (e) => {
    sendRequestToAddFriend({ variables: { userId: currentPersonalUser._id } })
      .then(() => {
        const newCurrentUser = {
          ...user,
          following: user.following.includes(currentPersonalUser._id)
            ? [...user.following]
            : [...user.following, currentPersonalUser._id],
          sendRequestToAddFriend: [
            ...user.sendRequestToAddFriend,
            currentPersonalUser._id,
          ],
        };
        setCurrentUser(newCurrentUser);
        if (personalUsers[currentPersonalUser.slug]) {
          const receiver = personalUsers[currentPersonalUser.slug];
          const updatedReceiver = {
            ...receiver,
            followed: receiver.followed.includes(user._id)
              ? [...receiver.followed]
              : [...receiver.followed, user._id],
            receiveRequestToAddFriend: [
              ...receiver.receiveRequestToAddFriend,
              user._id,
            ],
          };
          setPersonalUsers(updatedReceiver);
        }
        setCurrentPersonalUser({
          ...currentPersonalUser,
          followed: currentPersonalUser.followed.includes(user._id)
            ? [...currentPersonalUser.followed]
            : [...currentPersonalUser.followed, user._id],
          receiveRequestToAddFriend: [
            ...currentPersonalUser.receiveRequestToAddFriend,
            user._id,
          ],
        });
      })
      .catch((err) => console.log(err));
  };
  //Handle reject to add friend
  const onRejectRequestToAddFriend = () => {
    rejectRequestToAddFriend({
      variables: { senderId: currentPersonalUser._id },
    })
      .then(() => {
        const newCurrentUser = {
          ...user,
          receiveRequestToAddFriend: user.receiveRequestToAddFriend.filter(
            (_id) => _id.toString() !== currentPersonalUser._id.toString()
          ),
        };
        setCurrentUser(newCurrentUser);
        if (personalUsers[currentPersonalUser.slug]) {
          const sender = personalUsers[currentPersonalUser.slug];
          const updatedSender = {
            ...sender,
            sendRequestToAddFriend: sender.sendRequestToAddFriend.filter(
              (_id) => _id.toString() !== user._id.toString()
            ),
          };
          setPersonalUsers(updatedSender);
        }
        setCurrentPersonalUser({
          ...currentPersonalUser,
          sendRequestToAddFriend: currentPersonalUser.sendRequestToAddFriend.filter(
            (_id) => _id.toString() !== user._id.toString()
          ),
        });
        setOpenResponse(false);
      })
      .catch((err) => console.log(err));
  };
  //Handle cancel request to add friend
  const onCancelRequestToAddFriend = () => {
    cancelRequestToAddFriend({
      variables: { receiverId: currentPersonalUser._id },
    }).then(() => {
      const newCurrentUser = {
        ...user,
        following: user.following.filter(
          (_id) => _id.toString() !== currentPersonalUser._id.toString()
        ),
        sendRequestToAddFriend: user.sendRequestToAddFriend.filter(
          (_id) => _id.toString() !== currentPersonalUser._id.toString()
        ),
      };
      setCurrentUser(newCurrentUser);
      if (personalUsers[currentPersonalUser.slug]) {
        const receiver = personalUsers[currentPersonalUser.slug];
        setPersonalUsers({
          ...receiver,
          followed: receiver.followed.filter(
            (_id) => _id.toString() !== user._id.toString()
          ),
          receiveRequestToAddFriend: receiver.receiveRequestToAddFriend.filter(
            (_id) => _id.toString() !== user._id.toString()
          ),
        });
      }
      const newCurrentPersonalUser = {
        ...currentPersonalUser,
        followed: currentPersonalUser.followed.filter(
          (_id) => _id !== user._id
        ),
        receiveRequestToAddFriend: currentPersonalUser.receiveRequestToAddFriend.filter(
          (_id) => _id.toString() !== user._id.toString()
        ),
      };
      setCurrentPersonalUser(newCurrentPersonalUser);
    });
  };
  //Handle Follow User
  const onHandleFollowUser = () => {
    followUser({ variables: { userId: currentPersonalUser._id } }).then(() => {
      setCurrentUser({
        ...user,
        following: [...user.following, currentPersonalUser._id],
      });
      if (personalUsers[currentPersonalUser.slug]) {
        const follower = personalUsers[currentPersonalUser.slug];
        setPersonalUsers({
          ...follower,
          followed: [...follower.followed, user._id],
        });
      }
      setCurrentPersonalUser({
        ...currentPersonalUser,
        followed: [...currentPersonalUser.followed, user._id],
      });
    });
  };
  //Handle Unfollow user
  const onHandleUnfollowUser = () => {
    unFollowUser({ variables: { userId: currentPersonalUser._id } }).then(() => {
      setCurrentUser({
        ...user,
        following: user.following.filter(_id => _id.toString() !== currentPersonalUser._id.toString())
      });
      if (personalUsers[currentPersonalUser.slug]) {
        const follower = personalUsers[currentPersonalUser.slug];
        setPersonalUsers({
          ...follower,
          followed: follower.followed.filter(_id => _id.toString() !== user._id.toString())
        });
      }
      setCurrentPersonalUser({
        ...currentPersonalUser,
        followed: currentPersonalUser.followed.filter(_id => _id.toString() !== user._id.toString())
      });
    });
  };



  console.log(user);
  console.log(personalUsers);
  console.log(currentPersonalUser);
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
        <Button
          theme={colorMode}
          title="Cancel request"
          onClick={onCancelRequestToAddFriend}
        >
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
      {user.following.includes(currentPersonalUser._id) ? (
        <Button theme={colorMode} title="UnFollow" onClick={onHandleUnfollowUser}>
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
