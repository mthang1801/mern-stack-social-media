import React, { useEffect, useState } from "react";
import { ListConversationsWrapper } from "./styles/ListConversations.styles";
import { GET_LIST_CONVERSATIONS_CACHE_DATA } from "../../apollo/operations/queries/cache";
import ConversationItem from "./ConversationItem";
import _ from "lodash";
import { usePopupMessagesActions } from "./hook/usePopupActions";
import { FETCH_CHAT_CONVERSATIONS } from "../../apollo/operations/queries/chat/fetchChatConversations";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED } from "../../apollo/operations/mutations/chat";
import { cacheMutations } from "../../apollo/operations/mutations";
const ListConversations = () => {
  //use Query
  const {
    data: { currentChat, user, messagesStorage, numberOfConversations },
  } = useQuery(GET_LIST_CONVERSATIONS_CACHE_DATA, {
    fetchPolicy: "cache-only",
  });
  const { refetch: fetchMoreConversations } = useQuery(
    FETCH_CHAT_CONVERSATIONS,
    { fetchPolicy: "cache-and-network", skip: true }
  );
  //use State
  const [_messagesStorage, _setMessagesStorage] = useState([]);
  const [loadMoreConversations, setLoadMoreConversations] = useState(false);
  const [
    updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched,
  ] = useMutation(
    UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED
  );
  const { setInitialMessagesStorage } = cacheMutations;
  const { setShowPopup } = usePopupMessagesActions();
  useEffect(() => {
    console.log("here");
    const _convertStorageToArray = Object.values(messagesStorage);
    const _sortedByLatestMessages = _.sortBy(_convertStorageToArray, [
      function (o) {
        return -o.latestMessage.createdAt;
      },
    ]);
    _setMessagesStorage([..._sortedByLatestMessages]);
  }, [messagesStorage]);

  useEffect(() => {
    let isScrolling;
    function onScrollListConversations(e) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        console.log(scrollTop, clientHeight, scrollHeight);
        if (scrollTop + clientHeight > 0.75 * scrollHeight) {
          setLoadMoreConversations(true);
        }
      }, 66);
    }
    document.getElementById("list-conversations").addEventListener(
      "scroll",
      (e) => {
        onScrollListConversations(e);
      },
      false
    );
    return () => {
      clearTimeout(isScrolling);
      document.getElementById("list-conversations").removeEventListener(
        "scroll",
        (e) => {
          onScrollListConversations(e);
        },
        false
      );
    };
  });
  useEffect(() => {
    let _isMounted = true;

    if (
      loadMoreConversations &&
      numberOfConversations > _messagesStorage.length
    ) {
      const skip = _messagesStorage.length;
      const limit = +process.env.REACT_APP_NUMBER_CONVERSATIONS_LIMITATION;
      const except = Object.keys(messagesStorage);      
      let personalMessagesHaveReceiverSentStatus = new Set();
      fetchMoreConversations({ except, skip, limit }).then(({ data }) => {
        if (_isMounted) {
          console.log(data);
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
          setInitialMessagesStorage({ ...messagesStorage, ...storage });
          if (personalMessagesHaveReceiverSentStatus.size) {
            updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched({
              variables: {
                listSenderId: [...personalMessagesHaveReceiverSentStatus],
              },
            });
          }
          setLoadMoreConversations(false);
        }
      });
    }
  }, [loadMoreConversations, numberOfConversations]);  
  return (
    <ListConversationsWrapper id="list-conversations">
      {_messagesStorage.length
        ? _messagesStorage.map(
            ({ profile, scope, latestMessage, hasSeenLatestMessage }) => (
              <ConversationItem
                key={`conversation-${profile._id}`}
                conversation={profile}
                scope={scope}
                hasSeenLatestMessage={hasSeenLatestMessage}
                latestMessage={latestMessage}
                active={currentChat && currentChat._id === profile._id}
              />
            )
          )
        : null}
    </ListConversationsWrapper>
  );
};

export default ListConversations;
