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
import { FETCH_CHAT_CONVERSATIONS } from "../apollo/operations/queries/chat";
import { UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED } from "../apollo/operations/mutations/chat";
import { cacheMutations } from "../apollo/operations/mutations";
import useChatSubscriptions from "../components/Global/useChatSubscriptions";
import { RiContactsBookLine } from "react-icons/ri";
const ChatConversations = lazy(() =>
  import("../components/Chat/Conversations")
);
const ChatContacts = lazy(() => import("../components/Chat/Contact"));

const ChatsPage = ({ match }) => {
  //use Query
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-first" });
  const { refetch: fetchChatConversations } = useQuery(
    FETCH_CHAT_CONVERSATIONS,
    {
      fetchPolicy: "cache-and-network",
      skip: true,
    }
  );
  const [
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched,
  ] = useMutation(
    UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED
  );
  const { setInitialMessagesStorage } = cacheMutations;
  useChatSubscriptions();

  useEffect(() => {
    let _isMounted = true;
    if (!Object.keys(messagesStorage).length && user) {   
      console.log("render")  
      let personalMessagesHaveReceiverSentStatus = new Set();
      fetchChatConversations().then(({ data }) => {
        if (_isMounted) {          
          const { conversations } = data.fetchChatConversations;
          let storage = {};          
          conversations.forEach((conversation) => {
            if (conversation.scope === "PERSONAL") {
              storage[conversation.profile._id] = { ...conversation };
              if (
                conversation.latestMessage.receiver._id.toString() ===
                  user._id.toString() &&
                conversation.latestMessage.receiverStatus === "SENT"
              ) {
                personalMessagesHaveReceiverSentStatus.add(
                  conversation.latestMessage.sender._id
                );
              }
            }
          });          
          setInitialMessagesStorage({ ...storage });
          if (personalMessagesHaveReceiverSentStatus.size) {
            updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched({
              variables: {
                listSenderId: [...personalMessagesHaveReceiverSentStatus],
              },
            });
          }
        }
      });
    }
    return () => _isMounted = false ;
  }, []);
  console.log(messagesStorage)
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
