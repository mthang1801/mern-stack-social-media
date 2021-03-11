import React, { lazy, useEffect } from "react";
import Layout from "../containers/Layout";
import {
  GET_CURRENT_USER,
  GET_MESSAGES_STORAGE,
} from "../apollo/operations/queries/cache";
import { useQuery, useMutation } from "@apollo/client";
import CardRequestAuth from "../components/Card/CardRequestAuth";
import {
  RequestAuthScreen,
  ChatsWrapper,
  SidebarNav,
  MainTab,
} from "./styles/chats.styles";
import MenuChat from "../components/Chat/MenuChat";
import { Route, Switch } from "react-router-dom";
import { FETCH_INITIAL_CHAT_MESSAGES } from "../apollo/operations/queries/chat";
import { UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED } from "../apollo/operations/mutations/chat";
import { cacheMutations } from "../apollo/operations/mutations";
import useChatSubscriptions from "../components/Global/useChatSubscriptions";
const ChatConversations = lazy(() => import("../components/Chat/Conversations"));
const ChatContacts = lazy(() => import("../components/Chat/Contact"));

const ChatsPage = ({ match }) => {
  //use Query
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-first" });
  const { refetch: fetchInitialChatMessages } = useQuery(
    FETCH_INITIAL_CHAT_MESSAGES,
    {
      fetchPolicy: "cache-and-network",
      skip: true,
    }
  );
  const [updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched] = useMutation(
    UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED
  );
  const { setInitialMessagesStorage } = cacheMutations;
  useChatSubscriptions();
  useEffect(() => {
    if (!Object.keys(messagesStorage).length && user) {
      let personalMessagesHaveReceiverSentStatus = new Set();
      fetchInitialChatMessages()
        .then(({ data }) => {
          const { personalMessages } = data.fetchInitialChatMessages;
          let storage = {};
          personalMessages.forEach((newMessage) => {
            //check message is sent Status to, then push senderId to personalMessagesHaveReceiverSentStatus variable           
            if (
              newMessage.receiver._id === user._id &&
              newMessage.receiverStatus === "SENT" &&
              newMessage.__typename === "PersonalChat"
            ) {
              personalMessagesHaveReceiverSentStatus.add(newMessage.sender._id);
            }
            const messenger =
              newMessage.receiver._id === user._id
                ? newMessage.sender
                : newMessage.receiver;

            // setMessagesStorage( messenger,message, "PERSONAL")
            if (messenger && messenger._id) {
              const checkMessengerExist = storage[messenger._id];
              let updateNewMessage;
              if (checkMessengerExist) {
                updateNewMessage = {
                  ...checkMessengerExist,
                  messages: [
                    ...checkMessengerExist.messages,
                    { ...newMessage },
                  ],
                  latestMessage: newMessage,
                  hasSeenLatestMessage:
                    newMessage.receiver._id === user._id &&
                    newMessage.receiverStatus !== "SEEN"
                      ? false
                      : true,
                };
              } else {
                updateNewMessage = {
                  profile: { ...messenger },
                  messages: [{ ...newMessage }],
                  scope: "PERSONAL",
                  latestMessage: newMessage,
                  hasSeenLatestMessage:
                    newMessage.receiver._id === user._id &&
                    newMessage.receiverStatus !== "SEEN"
                      ? false
                      : true,
                };
              }
              storage = {
                ...storage,
                [messenger._id]: { ...updateNewMessage },
              };
            }
          });
          setInitialMessagesStorage(storage);        
          if (personalMessagesHaveReceiverSentStatus.size) {
            updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched({
              variables: {
                listSenderId: [...personalMessagesHaveReceiverSentStatus],
              },
            })
          }
        })
      
    }
  }, [messagesStorage, user]);
  if (!user)
    return (
      <Layout>
        <RequestAuthScreen>
          <CardRequestAuth />
        </RequestAuthScreen>
      </Layout>
    );
  return (
    <Layout>
      <ChatsWrapper>
        <SidebarNav>
          <MenuChat />
        </SidebarNav>
        <MainTab>
          <Switch>
            <Route exact path={match.path} component={ChatConversations} />
            <Route
              exact
              path={`${match.path}/contacts`}
              component={ChatContacts}
            />
          </Switch>
        </MainTab>
      </ChatsWrapper>
    </Layout>
  );
};

export default ChatsPage;
