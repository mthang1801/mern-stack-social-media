import React, {useEffect, useState} from 'react'
import {ListMessagesWrapper} from "./styles/ListMessages.styles"
import {useQuery} from "@apollo/client"
import {GET_CURRENT_USER, GET_MESSAGES_STORAGE} from "../../apollo/operations/queries/cache"
import {FETCH_FRIENDS} from "../../apollo/operations/queries/user"
import MessageItem from "./MessageItem"
import {usePopupMessagesActions} from "./hook/usePopupActions"
const ListMessages = () => {
  const {data : {user}} = useQuery(GET_CURRENT_USER);
  const {data : {messagesStorage}} = useQuery(GET_MESSAGES_STORAGE, {fetchPolicy : "cache-and-network"});
  const {refetch: fetchFriends} = useQuery(FETCH_FRIENDS, {skip :true});  
  
  const {setShowPopup} = usePopupMessagesActions()
  
  if(!Object.keys(messagesStorage).length) return null;
  return (
    <ListMessagesWrapper onScroll={() => setShowPopup(false)}>    
      {Object.values(messagesStorage).map(({profile,messages}) => (
        <MessageItem key={profile._id} messenger={profile} latestTime={messages[0].createdAt}/>
      ))}      
    </ListMessagesWrapper>
  )
}

export default ListMessages
