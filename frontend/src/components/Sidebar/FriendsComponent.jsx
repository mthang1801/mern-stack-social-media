import React, {useState} from 'react'
import FriendsList from "./FriendsList"
import ButtonOpenFriendsList from "../Controls/ButtonOpenFriendsList"
import {FriendsComponentWrapper} from "./Sidebar.styles"
import {cacheMutations} from "../../apollo/operations/mutations/cache"
import {GET_OPEN_FRIENDS_LIST,GET_FRIENDS} from "../../apollo/operations/queries/cache"
import {FETCH_FRIENDS} from "../../apollo/operations/queries/user"
import {useQuery} from "@apollo/client"
import {useThemeUI} from "theme-ui"
const FriendsComponent = () => {
  const {data : {openFriendsList}} = useQuery(GET_OPEN_FRIENDS_LIST, {fetchPolicy : "cache-first"})
  const {data : {friends}} = useQuery(GET_FRIENDS, {fetchPolicy : "cache-first"})
  const {refetch: fetchFriends} = useQuery(FETCH_FRIENDS, {fetchPolicy : "network-only", skip : true})
  const {setOpenFriendsList, setFriends} = cacheMutations  
  const handleOpenFriendsList = async () => {
    if(friends.length < +process.env.REACT_APP_FRIENDS_PER_LOAD){
      const skip=  friends.length;
      const limit = +process.env.REACT_APP_FRIENDS_PER_LOAD; 
      const {data} = await fetchFriends({skip, limit});
      if(data?.fetchFriends){
        setFriends([...friends, ...data.fetchFriends])
      }
    }
    setOpenFriendsList(!openFriendsList)
  }
  return (
    <FriendsComponentWrapper >
      <FriendsList show={openFriendsList} />
      <ButtonOpenFriendsList hide={openFriendsList} onClick={handleOpenFriendsList}/>
    </FriendsComponentWrapper>
  )
}

export default FriendsComponent
