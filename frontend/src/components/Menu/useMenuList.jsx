import { useState, useEffect } from 'react';
import useLanguage from '../Global/useLanguage';
import { useLocation } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/cache';
const useMenuList = () => {
  const user = useReactiveVar(userVar);

  const location = useLocation();
  const { lang, i18n } = useLanguage();
  const [namePage, setNamePage] = useState('');
  const [menu, setMenu] = useState([]);
  const [explores, setExplores] = useState([]);

  useEffect(() => {
    const menuName = i18n.store.data[lang].translation.menuList.find(
      (item) => item.path === location.pathname
    );
    setNamePage(menuName ? menuName.name : '');
    setMenu(i18n.store.data[lang].translation.menuList);
    setExplores(i18n.store.data[lang].translation.explores);
  }, [lang, i18n.store.data, location.pathname]);
  return {
    namePage,
    menu,
    explores,
  };
};

export default useMenuList;
