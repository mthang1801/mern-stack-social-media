import React from 'react'
import useLanguage from "../Global/useLanguage"
import {LinkItem} from "./styles/MenuChat.styles"
const MenuChat = () => {
  const {i18n,lang} = useLanguage();

  return i18n.store.data[lang].translation.chatMenus.map(item => (
    <LinkItem key={item.name} title={item.name} to={item.path} exact activeStyle={{backgroundColor:"#0277bd"}}>{item.icon()}</LinkItem>
  ))
}

export default MenuChat
