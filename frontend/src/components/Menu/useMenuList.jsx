import React from 'react';
import useLocale from '../../locales';
import { useLocation } from 'react-router-dom';
const useMenuList = () => {
  const location = useLocation();
  const { translation } = useLocale();
  return {
    namePage: translation.menuList.find(
      (item) => item.path === location.pathname
    )?.name,
    menu: translation.menuList,
    explores: translation.explores,
  };
};

export default useMenuList;
