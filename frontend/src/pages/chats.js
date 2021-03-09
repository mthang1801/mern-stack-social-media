import React, {lazy, useEffect} from "react";
import Layout from "../containers/Layout";
import { GET_CURRENT_USER, GET_MESSAGES_STORAGE } from "../apollo/operations/queries/cache";
import { useQuery} from "@apollo/client";
import CardRequestAuth from "../components/Card/CardRequestAuth";
import { RequestAuthScreen, ChatsWrapper, SidebarNav, MainTab } from "./styles/chats.styles";
import MenuChat from "../components/Chat/MenuChat";
import {Route, Switch} from "react-router-dom";
import { FETCH_INITIAL_CHAT_MESSAGES } from "../apollo/operations/queries/chat";
import { cacheMutations } from "../apollo/operations/mutations";
import useChatSubscriptions from "../components/Global/useChatSubscriptions"
const ChatMessages = lazy(() => import("../components/Chat/Messages"))
const ChatContacts = lazy(() => import("../components/Chat/Contact"))

const ChatsPage = ({match}) => {
  //use Query
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-first" });
  const {
    refetch: fetchInitialChatMessages,
  } = useQuery(FETCH_INITIAL_CHAT_MESSAGES, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const { setInitialMessagesStorage } = cacheMutations;
  useChatSubscriptions();
  useEffect(() => {
    if (!Object.keys(messagesStorage).length && user) {
      fetchInitialChatMessages().then(({ data }) => {
        const { privateMessages } = data.fetchInitialChatMessages;
        let storage = {};
        privateMessages.forEach((newMessage) => {
          const messenger =
            newMessage.receiver._id === user._id
              ? newMessage.sender
              : newMessage.receiver;
          // setMessagesStorage( messenger,message, "PRIVATE")
          if (messenger && messenger._id) {
            const checkMessengerExist = storage[messenger._id];
            let updateNewMessage;
            if (checkMessengerExist) {
              updateNewMessage = {
                ...checkMessengerExist,
                messages: [...checkMessengerExist.messages, { ...newMessage }],
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
                status: "PRIVATE",
                latestMessage: newMessage,
                hasSeenLatestMessage:
                  newMessage.receiver._id === user._id &&
                  newMessage.receiverStatus !== "SEEN"
                    ? false
                    : true,
              };
            }
            storage = { ...storage, [messenger._id]: { ...updateNewMessage } };
          }
        });
        setInitialMessagesStorage(storage);
      });
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
  return <Layout>
    <ChatsWrapper>
      <SidebarNav>
        <MenuChat/>
      </SidebarNav>
      <MainTab>
        <Switch>
          <Route exact path={match.path} component={ChatMessages}/>
          <Route exact path={`${match.path}/contacts`} component={ChatContacts}/>
        </Switch>
      </MainTab>
    </ChatsWrapper>
  </Layout>;
};

export default ChatsPage;
