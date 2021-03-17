import React, { useEffect, useState } from "react";
import { ListConversationsWrapper } from "./styles/ListConversations.styles";
import {
  GET_MESSAGES_STORAGE,
  GET_CURRENT_CHAT,  
  GET_CURRENT_USER,
  GET_NUMBER_OF_CONVERSATIONS
} from "../../apollo/operations/queries/cache";
import ConversationItem from "./ConversationItem";
import _ from "lodash";
import { usePopupMessagesActions } from "./hook/usePopupActions";
import {FETCH_CHAT_CONVERSATIONS} from "../../apollo/operations/queries/chat/fetchChatConversations"
import {useQuery, useMutation} from "@apollo/client";
import {UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED} from "../../apollo/operations/mutations/chat"
import { cacheMutations } from "../../apollo/operations/mutations";
const ListConversations = () => {
  //use Query  
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-only" });
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-only" });
    const {data: { numberOfConversations }
  } = useQuery(GET_NUMBER_OF_CONVERSATIONS, { fetchPolicy: "cache-only" });
  const {refetch : fetchMoreConversations} = useQuery(FETCH_CHAT_CONVERSATIONS, {fetchPolicy: "cache-and-network", skip : true})
  //use State
  const [_messagesStorage, _setMessagesStorage] = useState([]);
  const [loadMoreConversations, setLoadMoreConversations] = useState(false);
  const [updatePersonalReceiverStatusSentToDeliveredWhenReceiverFetched] = useMutation(UPDATE_PERSONAL_RECEIVER_STATUS_SENT_TO_DELIVERED_WHEN_RECEIVER_FETCHED)
  const {setInitialMessagesStorage} = cacheMutations;
  const { setShowPopup } = usePopupMessagesActions();   
  useEffect(() => {    
    const _convertStorageToArray = Object.values(messagesStorage);   
    const _sortedByLatestMessages = _.sortBy(_convertStorageToArray,[function(o) { return -o.latestMessage.createdAt; }])    
    _setMessagesStorage([..._sortedByLatestMessages])    
  }, [messagesStorage])
 
  const onScrollListConversations = e => {
    setShowPopup(false);
    const {scrollHeight, scrollTop, clientHeight} = e.target;    
    if(scrollTop + clientHeight > scrollHeight * 0.7 && scrollTop + clientHeight < scrollHeight * 0.7 + 40){
      if(!loadMoreConversations){
        setLoadMoreConversations(true); 
      }      
    }
  }  
  
  useEffect(() => {
    let _isMounted = true;   
    if(loadMoreConversations && user && numberOfConversations > _messagesStorage.length ){           
      const skip = _messagesStorage.length ; 
      const limit = +process.env.REACT_APP_NUMBER_CONVERSATIONS_LIMITATION; 
      let personalMessagesHaveReceiverSentStatus = new Set();
      fetchMoreConversations({skip, limit}).then(({ data }) => {
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
          setInitialMessagesStorage({ ...messagesStorage,...storage });
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
  },[loadMoreConversations,user])
  
  return (
    <ListConversationsWrapper onScroll={onScrollListConversations} >
      {_messagesStorage.length ? _messagesStorage.map(({ profile, scope, latestMessage, hasSeenLatestMessage }) => (
        <ConversationItem
          key={profile._id}
          conversation={profile}  
          scope={scope}                
          hasSeenLatestMessage={hasSeenLatestMessage}
          latestMessage={latestMessage}          
          active={currentChat && currentChat._id === profile._id}
        />
      )) : null}
    </ListConversationsWrapper>
  );
};

export default React.memo(ListConversations);
