import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetCurrentUser from "./setCurrentUser"
import {toggleButtonMenuVar, setPostStatusVar,setUserVar} from "../../cache"
export {SIGNUP} from "./signup"

const mutations = {
  toggleButtonMenu : createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus : createSetPostStatus(setPostStatusVar),
  setCurrentUser : createSetCurrentUser(setUserVar)
}

export {mutations as default }