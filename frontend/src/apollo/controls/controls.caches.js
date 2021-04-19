import {toggleMenuVar, toggleFriendsBoardVar, dialogVar} from "../cache"
export const toggleMenu = () => {    
  const _toggleMenu = toggleMenuVar();  
  console.log(_toggleMenu)
  return toggleMenuVar(!_toggleMenu)
}


export const setToggleFriendsBoard = () => {
  const _toggleFriendsBoard = toggleFriendsBoardVar();  
  return toggleFriendsBoardVar(!_toggleFriendsBoard);
}

export const setAlertDialog =  dialog => dialogVar({...dialog})