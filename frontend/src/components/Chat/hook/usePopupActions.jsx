import {useContext} from "react"
import {ContactContext} from "../Contact"
import {MessagesContext} from "../Messages"

export const usePopupContactActions = () => {
  const {setPopupPosition, setShowPopup} = useContext(ContactContext)
  return {setPopupPosition, setShowPopup}
}
export const usePopupMessagesActions = () => {
  const {setPopupPosition, setShowPopup} = useContext(MessagesContext)
  return {setPopupPosition, setShowPopup}
}