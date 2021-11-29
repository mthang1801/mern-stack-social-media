import React from 'react';
import useLocale from '../../locales';
import { LinkItem } from './styles/MenuChat.styles';
const MenuChat = () => {
  const { translation } = useLocale();

  return translation.chatMenus.map((item) => (
    <LinkItem
      key={item.name}
      title={item.name}
      to={item.oldPath}
      exact
      activeStyle={{ backgroundColor: '#0277bd' }}
    >
      {item.icon()}
    </LinkItem>
  ));
};

export default MenuChat;
