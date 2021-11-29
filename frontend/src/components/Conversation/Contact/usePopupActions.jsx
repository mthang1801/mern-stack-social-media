import { useContext } from 'react';
import { ContactContext } from '../Contact';
// import { MessagesContext } from '../Conversations';

export const usePopupContactActions = () => {
  const { setCurrentSettingElement, currentSettingElement } =
    useContext(ContactContext);
  return {
    setCurrentSettingElement,
    currentSettingElement,
  };
};
// export const usePopupMessagesActions = () => {
//   const { setPopupPosition, setShowPopup } = useContext(MessagesContext);
//   return { setPopupPosition, setShowPopup };
// };
