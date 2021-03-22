import React, {useState} from 'react'
import FriendsList from "./FriendsList"
import ButtonToggleFriendsList from "../Controls/ButtonToggleFriendsList"
import {FriendsBoardWrapper} from "./Sidebar.styles"
import {cacheMutations} from "../../apollo/operations/mutations/cache"
import {GET_OPEN_FRIENDS_LIST,GET_FRIENDS} from "../../apollo/operations/queries/cache"
import {FETCH_FRIENDS} from "../../apollo/operations/queries/user"
import {useQuery} from "@apollo/client"
import {useThemeUI} from "theme-ui"
const FriendsBoard = () => {
  const {data : {openFriendsList}} = useQuery(GET_OPEN_FRIENDS_LIST, {fetchPolicy : "cache-first"})
  return (
    <FriendsBoardWrapper show={openFriendsList}>
      <FriendsList show={openFriendsList} />
      <ButtonToggleFriendsList />
    </FriendsBoardWrapper>
  )
}

export default FriendsBoard
