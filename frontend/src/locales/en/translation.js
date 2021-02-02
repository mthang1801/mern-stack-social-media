import React from "react";
import {FaHome, FaUserFriends} from "react-icons/fa"
import {AiOutlineGlobal} from "react-icons/ai"
import {ImNewspaper} from "react-icons/im"
import {HiOutlineUserGroup} from "react-icons/hi"

export const en = {
  translation : {
    navigationAuth : [
      {
        path : "/", 
        name : "Home",
        icon : () => <FaHome/>
      },
      {
        path : "/explorer", 
        name : "Explorer",
        icon : () => <AiOutlineGlobal/>
      },
      {
        path : "/news",
        name : "News",
        icon : () => <ImNewspaper/>
      },
      {
        path : "/friends",
        name : "Friends",
        icon : () => <FaUserFriends/>
      },
      {
        path : "/groups",
        name : "Groups",
        icon : () => <HiOutlineUserGroup/>
      }
    ],   
  }
}