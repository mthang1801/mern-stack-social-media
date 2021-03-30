import React from "react";
import {
  FaHome,
  FaUserFriends,
  FaShopify,
  FaGlobeAmericas,  
} from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { ImNewspaper } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  IoIosNotifications,
  IoMdApps,
  IoMdTrendingUp,
  IoMdPhotos,
  IoIosChatbubbles,
} from "react-icons/io";
import { CgMoreO } from "react-icons/cg";
import { MdCardMembership, MdInsertEmoticon } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { BiLockAlt,BiLike, BiCommentDetail,BiShareAlt } from "react-icons/bi";


export const vi = {
  translation: {
    navigationAuth: [
      {
        path: "/",
        name: "Trang chủ",
        icon: () => <FaHome />,
      },
      {
        path: "/explorer",
        name: "Khám phá",
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: "/news",
        name: "Bản tin",
        icon: () => <ImNewspaper />,
      },
      {
        path: "/contacts",
        name: "Danh bạ",
        icon: () => <FaUserFriends />,
      },
      {
        path: "/groups",
        name: "Nhóm",
        icon: () => <HiOutlineUserGroup />,
      },
    ],
    menuList: [
      {
        path: "/",
        name: "Trang chủ",
        icon: () => <FaHome />,
      },
      {
        path: "/notifications",
        name: "Thông báo",
        icon: () => <IoIosNotifications />,
      },
      {
        path: "/contacts",
        name: "Danh bạ",
        icon: () => <FaUserFriends />,
      },
      {
        path: "/chats",
        name: "Tin nhắn",
        icon: () => <IoIosChatbubbles />,
      },
      {
        path: "/groups",
        name: "Nhóm",
        icon: () => <HiOutlineUserGroup />,
      },
      {
        path: "/explores",
        name: "Khám phá",
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: "/news",
        name: "Tin mới",
        icon: () => <ImNewspaper />,
      },
      {
        path: "/more",
        name: "Thêm",
        icon: () => <CgMoreO />,
      },
    ],
    personalMenus: [
      {
        path: (slug) => `/${slug}/posts`,
        name: "Bài đăng",
      },
      {
        path: (slug) => `/${slug}/about`,
        name: "Giới thiệu",
      },
      {
        path: (slug) => `/${slug}/friends`,
        name: "Bạn bè",
      },
      {
        path: (slug) => `/${slug}/photos`,
        name: "Hình ảnh",
      },
    ],
    chatMenus: [
      {
        path: "/chats",
        name: "Tin nhắn",
        icon: () => <BsChatDots />,
      },
      {
        path: "/chats/contacts",
        name: "Danh bạ",
        icon: () => <RiContactsBook2Line />,
      },
    ],
    explores: [
      {
        path: "/apps",
        name: "Apps",
        icon: () => <IoMdApps />,
      },
      {
        path: "/upgrade-member",
        name: "Upgrade member",
        icon: () => <MdCardMembership />,
      },
      {
        path: "/shop",
        name: "Shop",
        icon: () => <FaShopify />,
      },
      {
        path: "/trends",
        name: "Trends",
        icon: () => <IoMdTrendingUp />,
      },
    ],    
    statusFooter: [
      {
        name: "Hình ảnh/ Videos",
        icon: () => <IoMdPhotos />,
      },
      {
        name: "Cảm xúc",
        icon: () => <MdInsertEmoticon />,
      },
    ],
    auth: {
      login: "Đăng nhập",
      signup: "Đăng ký",
      signout: "Đăng xuất",
    },
    mindText: "Bạn đang nghĩ gì?",
    menu: "Danh mục",
    notifications: {
      message: "Bạn vừa nhận được một thông báo mới",
      postCreated: "vừa đăng một trạng thái mới.",
      sentRequestToAddFriend: "gửi cho bạn một lời mời kết bạn.",
      acceptRequestToAddFriend: "đã chấp nhận lời mời kết bạn của bạn.",
      postMention : "Nhắc đến bạn trong bài viết của anh ấy",
      likePost: "đã thích bài viết của bạn",
      commentMention : "Đã nhắc đến bạn trong bình luận của anh ấy",
      commentCreated : "Đã viết bình luận trong bài viết của bạn"
    },
    greeting: {
      welcome: "Chào mừng bạn đã đến với Pul.com",
      introduce:
        "Pul là một nền tảng mạng xã hội được phát triển bởi cá nhân tôn trọng tiếng nói và suy nghĩ của người dùng.",
    },
    controls: {
      search: "Tìm kiếm",
      openFriendsList: "Hiển thị Danh bạ",
      closeFriendsList: "Đóng Danh bạ",
    },
    contacts: {
      contactsList: "Bạn bè",
      title: "Quản lý liên lạc",
      userSentRequest: "Yêu cầu kết bạn đến",
      userReceivedRequest: "Lời mời kết bạn từ",
      friendsList: "Bạn bè",
      cancelRequest: "Hủy Yêu cầu",
      acceptRequest: "Chấp nhận",
      rejectRequest: "Từ chối",
      getMore: "Lấy thêm",
    },
    post : {
      post : "Đăng bài viết",
      postPlaceholder : "Chia sẻ cảm nghĩ của bạn",      
      status :  [
        {
          name: "Công khai",
          icon: () => <FaGlobeAmericas />,
        },
        {
          name: "Bạn bè",
          icon: () => <FaUserFriends />,
        },
        {
          name: "Cá nhân",
          icon: () => <BiLockAlt />,
        },
      ],
      controls: {
        like : {
          name : "Thích",
          icon : () => <BiLike/>
        },
        liked : {
          name : "Đã Thích",
          icon : () => <BiLike/>
        },
        comment : {
          name : "Bình luận",
          icon : () => <BiCommentDetail/>
        },
        share :{
          name : "Chia sẻ",
          icon : () => <BiShareAlt/>
        }
      },
      
    },
    comment : {
      controls: {
        like : "Thích",
        liked : "Đã thích", 
        response : "Trả lời"
      },
      commentPlaceholder : "Để lại bình luận của bạn",
      commentInputPlaceholder : "Để lại bình luận của bạn tại đây"
    },
    chat : {
      chatInputPlaceholder :`Gửi tin nhắn tới`
    }
  },
};
