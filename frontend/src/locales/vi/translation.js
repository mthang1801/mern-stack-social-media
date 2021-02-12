import React from "react";
import {FaHome, FaUserFriends, FaShopify, FaGlobeAmericas} from "react-icons/fa"
import {AiOutlineGlobal} from "react-icons/ai"
import {ImNewspaper} from "react-icons/im"
import {HiOutlineUserGroup} from "react-icons/hi"
import {IoIosNotifications, IoMdApps, IoMdTrendingUp, IoMdPhotos} from "react-icons/io"
import {CgMoreO} from "react-icons/cg"
import {MdCardMembership, MdInsertEmoticon} from "react-icons/md"

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
        name : "Công khai", 
        icon : () => <FaGlobeAmericas/>
      },
      {
        name : "Riêng tư", 
        icon : () => <FaUserFriends/>
      }
    ],
    statusFooter: [
      {
        name : "Hình ảnh/ Videos", 
        icon : () => <IoMdPhotos/>
      },
      {
        name : "Cảm xúc",
        icon : () => <MdInsertEmoticon/>
      }      
    ],
    auth : {
      login : "Đăng nhập",
      signup : "Đăng ký",
      signout : "Đăng xuất"
    },    
    mindText:  "Bạn đang nghĩ gì?",
    menu : "Danh mục",
    postCreated : (name) => `${name} vừa đăng một trạng thái mới.`
  }
}