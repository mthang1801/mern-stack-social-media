import React from 'react'

import {useQuery, useReactiveVar} from "@apollo/client";
import {userVar, friendsVar} from "../../apollo/cache"
import {useThemeUI} from "theme-ui"
import {ContactWrapper, Title} from "./Contact.styles"
import useLanguage from "../Global/useLanguage"
import ContactItem from "./ContactItem"
const SentRequestsToAddFriend = () => {
  const user = useReactiveVar(userVar);
  const friends = useReactiveVar(friendsVar);
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