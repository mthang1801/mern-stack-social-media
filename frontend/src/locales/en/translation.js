import React from "react";
import {FaHome, FaUserFriends, FaShopify, FaGlobeAmericas} from "react-icons/fa"
import {AiOutlineGlobal} from "react-icons/ai"
import {ImNewspaper} from "react-icons/im"
import {HiOutlineUserGroup} from "react-icons/hi"
import {IoIosNotifications, IoMdApps, IoMdTrendingUp, IoMdPhotos} from "react-icons/io"
import {CgMoreO} from "react-icons/cg"
import {MdCardMembership, MdInsertEmoticon} from "react-icons/md"

export const en = {
  translation: {
    navigationAuth: [
      {
        path: "/",
        name: "Home",
        icon: () => <FaHome />,
      },
      {
        path: "/explorer",
        name: "Explorer",
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: "/news",
        name: "News",
        icon: () => <ImNewspaper />,
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
    explores : [
      {
        path : "/apps",
        name : "Apps",
        icon : () => <IoMdApps/>
      },
      {
        path : "/upgrade-member",
        name : "Upgrade member",
        icon : () => <MdCardMembership/>
      },
      {
        path : "/shop",
        name : "Shop", 
        icon : () => <FaShopify/>
      },
      {
        path : "/trends",
        name : "Trends", 
        icon : () => <IoMdTrendingUp/>
      }
    ],
    status : [
      {
        name : "public", 
        icon : () => <FaGlobeAmericas/>
      },
      {
        name : "private", 
        icon : () => <FaUserFriends/>
      }
    ],
    statusFooter: [
      {
        name : "Photos/Videos", 
        icon : () => <IoMdPhotos/>,
        color : "var(--success)"
      },
      {
        name : "Emoji",
        icon : () => <MdInsertEmoticon/>,
        color : "var(--orange)"
      }      
    ],
    auth : {
      login : "Login", 
      signup : "Sign up",
      signout : "Sign Out"
    },
    mindText:  "What's on your mind?",
    menu : "Menu",
    postCreated : (name) => `${name} has just posted a new status.`
  },
};