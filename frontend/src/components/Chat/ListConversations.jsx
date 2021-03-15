import React, { useEffect, useState } from "react";
import { ListConversationsWrapper } from "./styles/ListConversations.styles";
import { useQuery } from "@apollo/client";
import {
  GET_MESSAGES_STORAGE,
  GET_CURRENT_CHAT,
} from "../../apollo/operations/queries/cache";
import ConversationItem from "./ConversationItem";
import _ from "lodash";
import { usePopupMessagesActions } from "./hook/usePopupActions";
const ListConversations = () => {
  //use Query  
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-only" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-first" });
  //use State
  const [_messagesStorage, _setMessagesStorage] = useState([]);

  useEffect(() => {    
    const _convertStorageToArray = Object.values(messagesStorage);   
    const _sortedByLatestMessages = _.sortBy(_convertStorageToArray,[function(o) { return -o.latestMessage.createdAt; }])    
    _setMessagesStorage([..._sortedByLatestMessages])    
  }, [messagesStorage])

  const { setShowPopup } = usePopupMessagesActions();    
  return (
    <ListConversationsWrapper onScroll={() => setShowPopup(false)}>
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
