import React, { useEffect, useState } from "react";
import { ListMessagesWrapper } from "./styles/ListMessages.styles";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_MESSAGES_STORAGE,
  GET_CURRENT_CHAT,
} from "../../apollo/operations/queries/cache";
import MessageItem from "./MessageItem";
import _ from "lodash";
import { usePopupMessagesActions } from "./hook/usePopupActions";
const ListMessages = () => {
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
    console.log("render")
    const _convertStorageToArray = Object.values(messagesStorage);
   
    const _sortedByLatestMessages = _.sortBy(_convertStorageToArray,[function(o) { return -o.latestMessage.createdAt; }])
    console.log(_sortedByLatestMessages)
    _setMessagesStorage([..._sortedByLatestMessages])    
  }, [messagesStorage])

  const { setShowPopup } = usePopupMessagesActions();  
  
  return (
    <ListMessagesWrapper onScroll={() => setShowPopup(false)}>
      {_messagesStorage.length ? _messagesStorage.map(({ profile, messages, status, latestMessage, hasSeenLatestMessage }) => (
        <MessageItem
          key={profile._id}
          messenger={profile}  
          status={status}                
          hasSeenLatestMessage={hasSeenLatestMessage}
          latestMessage={latestMessage}          
          active={currentChat && currentChat._id === profile._id}
        />
      )) : null}
    </ListMessagesWrapper>
  );
};

export default React.memo(ListMessages);
