import React, { useState, useEffect, createRef, useCallback } from "react";
import { Wrapper } from "./styles/ChatBoardBody.styles";
import Bubble from "./Bubble";
import { useThemeUI } from "theme-ui";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
  GET_CURRENT_CHAT,
  GET_MESSAGES_STORAGE,  
} from "../../apollo/operations/queries/cache";
import {userVar} from "../../apollo/cache"
import { FETCH_MESSAGES } from "../../apollo/operations/queries/chat";
import { cacheMutations } from "../../apollo/operations/mutations/cache";

const ChatBoardBody = () => {
  //useState
  const [loadMoreMessages, setLoadMoreMessages] = useState(false);
  //useQuery
  const {
    data: { currentChat },
  } = useQuery(GET_CURRENT_CHAT, { fetchPolicy: "cache-first" }); 
  const user = useReactiveVar(userVar);
  const {
    data: { messagesStorage },
  } = useQuery(GET_MESSAGES_STORAGE, { fetchPolicy: "cache-first" });
  const { refetch: fetchMoreMessages } = useQuery(FETCH_MESSAGES, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const chatBoardBodyRef = createRef(null);
  const { updateMoreMessages } = cacheMutations;
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(true);
  const { colorMode } = useThemeUI();
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      if (chatBoardBodyRef.current && shouldScrollIntoView) {
        chatBoardBodyRef.current.scrollIntoView({
          behavior: "auto",
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if(messagesStorage[currentChat?._id]?.latestMessage.sender._id === user._id ){
      timer = setTimeout(() => {
        if (chatBoardBodyRef.current) {
          chatBoardBodyRef.current.scrollIntoView({
            behavior: "auto",
          });
        }
      }, 10);
    }
    
    return () => clearTimeout(timer);
  }, [currentChat,messagesStorage[currentChat?._id]?.messages, user]);
  
  useEffect(() => {
    let isScrolling;
    function onScrollBodyBoard(e) {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollTop + clientHeight === scrollHeight) {
          setShouldScrollIntoView(true);
        } else {
          setShouldScrollIntoView(false);
        }
        if (
          scrollTop + clientHeight <
          (scrollHeight - scrollTop) / 2 + scrollHeight * 0.15
        ) {
          setLoadMoreMessages(true);
        }
      }, 66);
    }
    document.getElementById("body-board").addEventListener(
      "scroll",
      function (e) {
        onScrollBodyBoard(e);
      },
      false
    );
    return () => {
      clearTimeout(isScrolling);
      document.getElementById("body-board").removeEventListener(
        "scroll",
        function (e) {
          onScrollBodyBoard(e);
        },
        false
      );
    };
  });

  useEffect(() => {
    let _isMounted = true;
    if (loadMoreMessages) {
      const skip = messagesStorage[currentChat._id].messages.length;
      const limit = +process.env.REACT_APP_NUMBER_MESSAGES_PER_LOAD;
      const conversationId = currentChat._id;
      const scope = currentChat.scope;
      fetchMoreMessages({ conversationId, scope, skip, limit }).then(
        ({ data }) => {
          if (_isMounted) {
            const { messages } = data.fetchMessages;
            updateMoreMessages(conversationId, messages);
            setLoadMoreMessages(false);
          }
        }
      );
    }
    return () => (_isMounted = false);
  }, [loadMoreMessages]);

  return (
    <Wrapper
      theme={colorMode}
      id="body-board"
      // onScrollCapture={onScrollBoardBody}
    >
      {currentChat &&
      messagesStorage[currentChat._id] &&
      messagesStorage[currentChat._id].messages.length &&
      user
        ? messagesStorage[currentChat._id].messages.map((message, idx) => {
            return (
              <Bubble
                key={`bubble-${message._id}`}
                message={message}
                user={user}
                me={message.sender && message.sender._id === user._id}
                senderAvatar={
                  message.sender && message.sender._id === user._id
                    ? user.avatar
                    : currentChat.avatar
                }
                index={idx}
              />
            );
          })
        : null}
      <div ref={chatBoardBodyRef}></div>
    </Wrapper>
  );
};

export default ChatBoardBody;
