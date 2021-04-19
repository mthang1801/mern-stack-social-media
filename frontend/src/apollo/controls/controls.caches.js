import { toggleMenuVar, toggleFriendsBoardVar, dialogVar } from "../cache";
import {initialState} from "../initialState"
export const toggleMenu = () => {
  const _toggleMenu = toggleMenuVar();
  console.log(_toggleMenu);
  return toggleMenuVar(!_toggleMenu);
};

export const setToggleFriendsBoard = () => {
  const _toggleFriendsBoard = toggleFriendsBoardVar();
  return toggleFriendsBoardVar(!_toggleFriendsBoard);
};

export const setAlertDialog = (dialog) => dialogVar({ ...dialog });

export const clearAlertDialog = () => dialogVar(initialState.alertDialog)