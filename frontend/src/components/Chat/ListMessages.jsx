import React, { useEffect, useState } from "react";
import { ListMessagesWrapper } from "./styles/ListMessages.styles";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_MESSAGES_STORAGE,
  GET_CURRENT_CHAT,
} from "../../apollo/operations/queries/cache";
import { FETCH_FRIENDS } from "../../apollo/operations/queries/user";
import MessageItem from "./MessageItem";
import { usePopupMessagesActions } from "./hook/usePopupActions";
const ListMessages = () => {
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-only" });
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-and-network" });
  const { refetch: fetchFriends } = useQuery(FETCH_FRIENDS, { skip: true });

  const { setShowPopup } = usePopupMessagesActions();

  if (!Object.keys(messagesStorage).length) return null;
  return (
    <ListMessagesWrapper onScroll={() => setShowPopup(false)}>
      {Object.values(messagesStorage).map(({ profile, messages }) => (
        <MessageItem
          key={profile._id}
          messenger={profile}
          latestTime={messages[0].createdAt}
          active={currentChat && currentChat._id === profile._id}
        />
      ))}
    </ListMessagesWrapper>
  );
};

export default React.memo(ListMessages);
