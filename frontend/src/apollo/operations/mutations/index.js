import createToggleButtonMenu from "./toggleButtonMenu";
import createSetPostStatus from "./setPostStatus";
import createSetCurrentUser from "./setCurrentUser"
import createSetPosts from "./setPosts"
import {toggleButtonMenuVar, setPostStatusVar,setUserVar, setPostsVar} from "../../cache"
export {SIGNUP} from "./signup"
export {CREATE_POST} from "./createPost"
const mutations = {
  toggleButtonMenu : createToggleButtonMenu(toggleButtonMenuVar),
  setPostStatus : createSetPostStatus(setPostStatusVar),
  setCurrentUser : createSetCurrentUser(setUserVar),
  setPosts : createSetPosts(setPostsVar)
}

export {mutations as default }