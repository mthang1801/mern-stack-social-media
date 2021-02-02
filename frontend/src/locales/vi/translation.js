import React from "react";
import {FaHome, FaUserFriends, FaFacebookMessenger} from "react-icons/fa"
import {AiOutlineGlobal} from "react-icons/ai"
import {ImNewspaper} from "react-icons/im"
import {HiOutlineUserGroup} from "react-icons/hi"
export const vi = {
  translation : {
    navigationAuth : [
      {
        path : "/", 
        name : "Trang chủ",
        icon : () => <FaHome/>
      },
      {
        path : "/explorer", 
        name : "Khám phá",
        icon : () => <AiOutlineGlobal/>
      },
      {
        path : "/news",
        name : "Bản tin",
        icon : () => <ImNewspaper/>
      },
      {
        path : "/friends",
        name : "Bạn bè",
        icon : () => <FaUserFriends/>
      },
      {
        path : "/groups",
        name : "Nhóm",
        icon : () => <HiOutlineUserGroup/>
      }
    ],
    
  }
}