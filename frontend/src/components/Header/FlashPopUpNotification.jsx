import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useThemeUI } from "theme-ui";
import useLanguage from "../Global/useLanguage"
const FlashPopUpNotification = () => {
  const [notification, setNotification] = useState("")
  
  const { colorMode } = useThemeUI();
  const {i18n, lang} = useLanguage()

  useEffect(() => {
    setNotification(i18n.store.data[lang].translation.notification.message);
  },[lang])

  return <PopupWrapper theme={colorMode}>
    {notification}
    </PopupWrapper>;
};

const PopupWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 0.5rem;
  box-shadow: var(--mediumShadow);
  font-size: 0.9rem;
  padding: 1rem 2rem;  
`;

export default FlashPopUpNotification;
