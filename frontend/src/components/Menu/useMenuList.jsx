import React, {useState, useEffect} from 'react'
import useLanguage from "../Global/useLanguage"
import {useLocation} from "react-router-dom"
const useMenuList = () => {
  const location = useLocation();
  const { lang, i18n } = useLanguage();
  const [namePage, setNamePage] = useState("");
  const [menu, setMenu] = useState([]);  
  const [explores, setExplores] = useState([]);
  useEffect(() => {
    setNamePage(
      i18n.store.data[lang].translation.menuList.find(
        (item) => item.path === location.pathname
      ).name || ""
    );
    setMenu(i18n.store.data[lang].translation.menuList);
    setExplores(i18n.store.data[lang].translation.explores);
  }, [lang]);
  return {
    namePage,
    menu, 
    explores
  }
}

export default useMenuList
