import React from "react";
import {FaHome, FaUserFriends} from "react-icons/fa"
import {AiOutlineGlobal} from "react-icons/ai"
import {ImNewspaper} from "react-icons/im"
import {HiOutlineUserGroup} from "react-icons/hi"
import {IoIosNotifications} from "react-icons/io"
import {CgMoreO} from "react-icons/cg"
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
    menuList: [
      {
        path: "/",
        name: "Home",
        icon: () => <FaHome />,
      },
      {
        path: "/notifications",
        name: "Notification",
        icon: () => <IoIosNotifications />,
      },
      {
        path: "/friends",
        name: "Friends",
        icon: () => <FaUserFriends />,
      },
      {
        path: "/groups",
        name: "Groups",
        icon: () => <HiOutlineUserGroup />,
      },
      {
        path: "/explores",
        name: "Explores",
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: "/news",
        name: "News",
        icon: () => <ImNewspaper />,
      },
      {
        path: "/more",
        name: "More",
        icon: () => <CgMoreO />,
      },
    ],
    menu : "Danh mục"
  }
}