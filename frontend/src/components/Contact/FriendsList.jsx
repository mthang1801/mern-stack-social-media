import React from 'react'
import {GET_CURRENT_USER, GET_FRIENDS} from "../../apollo/operations/queries/cache"
import {useQuery} from "@apollo/client";
import {useThemeUI} from "theme-ui"
import {ContactWrapper, Title} from "./Contact.styles"
import useLanguage from "../Global/useLanguage"
import ContactItem from "./ContactItem"
const SentRequestsToAddFriend = () => {
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"});
  const {data : {friends}} = useQuery(GET_FRIENDS, {fetchPolicy : "cache-first"});
  const {colorMode} = useThemeUI();
  const {i18n, lang} = useLanguage()
  if(!user || !friends.length) return null ; 
  return (
    <ContactWrapper theme={colorMode}>      
      <Title theme={colorMode}>{i18n.store.data[lang].translation.contacts.friendsList}</Title>      
        {friends.map(item => (
          <ContactItem key={item._id} userContact={item} type="friends"/>
        ))}
    </ContactWrapper>
  )
}

export default React.memo(SentRequestsToAddFriend)