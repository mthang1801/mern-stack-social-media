import React, {useEffect, useState} from 'react'
import {ListMessagesWrapper} from "./styles/ListMessages.styles"
import {useQuery} from "@apollo/client"
import {GET_CURRENT_USER} from "../../apollo/operations/queries/cache"
import {FETCH_FRIENDS} from "../../apollo/operations/queries/user"
import MessageItem from "./MessageItem"
import {usePopupMessagesActions} from "./hook/usePopupActions"
const ListMessages = () => {
  const {data : {user}} = useQuery(GET_CURRENT_USER);
  const {refetch: fetchFriends} = useQuery(FETCH_FRIENDS, {skip :true});
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchFriends({limit : 50}).then(({data}) => {
        setFriends(data.fetchFriends);
    })
  },[user])
  const {setShowPopup} = usePopupMessagesActions()
  return (
    <ListMessagesWrapper onScroll={() => setShowPopup(false)}>    
      {friends.length ? friends.map(friend => (
        <MessageItem key={friend._id} friend={friend}/>
      )): null}
    </ListMessagesWrapper>
  )
}

export default ListMessages
