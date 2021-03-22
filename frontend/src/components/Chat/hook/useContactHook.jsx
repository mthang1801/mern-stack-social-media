import {useContext} from 'react'
import {ContactContext} from "../Contact"
export const useContactStates = () => {
  const {states : {messagesStorage} } = useContext(ContactContext)
  return {messagesStorage}
}

