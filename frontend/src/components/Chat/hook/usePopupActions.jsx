import {useContext} from "react"
import {ContactContext} from "../Contact"

export const usePopupActions = () => {
  const {setPopupPosition, setShowPopup} = useContext(ContactContext)
  return {setPopupPosition, setShowPopup}
}