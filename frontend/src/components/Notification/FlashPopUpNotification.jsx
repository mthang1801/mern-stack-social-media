import React, { useState, useEffect } from "react";
import { PopupWrapper } from "./styles/FlashPopUpNotification.styles";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage";
import { GET_OPEN_POPUP_NOTIFICATION } from "../../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
import {cacheMutations} from "../../apollo/operations/mutations/cache"

const FlashPopUpNotification = ({onClick}) => {  
  const {setOpenPopupNotification} = cacheMutations
  const {
    data: { openPopupNotification },
  } = useQuery(GET_OPEN_POPUP_NOTIFICATION, { fetchPolicy: "cache-only" });
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();

  const {message} = i18n.store.data[lang].translation.notifications;
  useEffect(() => {
    let timer ;
    if(openPopupNotification){
      clearTimeout(timer);
      timer = setTimeout(() => {
        setOpenPopupNotification(false);
      },6000)
    }
    return () => clearTimeout(timer);
  },[openPopupNotification])
  console.log("sa")
  const onClickPopup = () => {
    onClick();
    setOpenPopupNotification(false);
  }
  return (
    <PopupWrapper show={openPopupNotification} theme={colorMode}  onClick={onClickPopup}>
      {message}
    </PopupWrapper>
  );
};

export default React.memo(FlashPopUpNotification);
