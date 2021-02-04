import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetUser from "./setUser"
import {toggleButtonMenuVar, setPostStatusVar,setUserVar} from "../../cache"
export {SIGNUP} from "./signup"

const mutations = {
  toggleButtonMenu : createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus : createSetPostStatus(setPostStatusVar),
  setUser : createSetUser(setUserVar)
}

export {mutations as default }