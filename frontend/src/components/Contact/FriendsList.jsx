import React from 'react'
import {useThemeUI} from "theme-ui"
import {ContactWrapper, Title} from "./Contact.styles"
import useLanguage from "../Global/useLanguage"
import ContactItem from "./ContactItem"
import InfiniteScroll from "react-infinite-scroll-component"
import {FETCH_USER_FRIENDS_DATA} from "../../apollo/contact/contact.types"
import {pushFriendsListToContact} from "../../apollo/contact/contact.caches"
import { useQuery } from '@apollo/client'
import _ from "lodash"
const SentRequestsToAddFriend = ({user, friends}) => {  
  const {colorMode} = useThemeUI();
  const {i18n, lang} = useLanguage()
  const {refetch : fetchUserFriends} = useQuery(FETCH_USER_FRIENDS_DATA, {skip: true})
  const onFetchMoreFriends = () => {    
    const skip = friends.length; 
    const limit = +process.env.REACT_APP_USERS_CONTACT_PER_LOAD;
 
    let existedFriendsId = [];
    friends.forEach(friend => existedFriendsId.push(friend._id));  
    fetchUserFriends({skip, limit, except : existedFriendsId}).then(({data}) => {
      if(data){
        pushFriendsListToContact(data.fetchFriends);
      }
    })
  }
  
  return (
    <ContactWrapper theme={colorMode}>      
      <Title theme={colorMode}>{i18n.store.data[lang].translation.contacts.friendsList}</Title>      
      <InfiniteScroll
        dataLength={friends.length}
        next={onFetchMoreFriends}
        hasMore={friends.length < user.friends.length}
        loader={<h4>Loading...</h4>}        
      >
      {friends.map(item => (
          <ContactItem key={item._id} user={user} userContact={item} type="friends"/>
        ))}
      </InfiniteScroll>
        
    </ContactWrapper>
  )
}

export default SentRequestsToAddFriend