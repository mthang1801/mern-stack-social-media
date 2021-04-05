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
        path: "/contacts",
        name: "Contacts",
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
        name: "Notifications",
        icon: () => <IoIosNotifications />,
      },
      {
        path: "/contacts",
        name: "Contacts",
        icon: () => <FaUserFriends />,
      },
      {
        path: "/chats",
        name: "Chats",
        icon: () => <IoIosChatbubbles />,
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
    personalMenus: [
      {
        path: (slug) => `/${slug}/posts`,
        name: "Posts",
      },
      {
        path: (slug) => `/${slug}/about`,
        name: "About",
      },
      {
        path: (slug) => `/${slug}/friends`,
        name: "Friends",
      },
      {
        path: (slug) => `/${slug}/photos`,
        name: "Photos",
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
    chatMenus: [
      {
        path: "/chats",
        name: "Messages",
        icon: () => <BsChatDots />,
      },
      {
        path: "/chats/contacts",
        name: "Contacts",
        icon: () => <RiContactsBook2Line />,
      },
    ],   
    statusFooter: [
      {
        name: "Photos/Videos",
        icon: () => <IoMdPhotos />,
        color: "var(--success)",
      },
      {
        name: "Emoji",
        icon: () => <MdInsertEmoticon />,
        color: "var(--orange)",
      },
    ],
    auth: {
      login: "Login",
      signup: "Sign up",
      signout: "Sign Out",
    },
    mindText: "What's on your mind?",
    menu: "Menu",
    notifications: {
      message: "You have just received a new message.",
      postCreated: "has just posted a new status.",
      sentRequestToAddFriend: "send you a request to add friend",
      acceptRequestToAddFriend: "has accepted your request to add friend.",
      postMention : "has mentioned you in his post",
      likePost : "Liked your post",
      commentMention : "has mentioned you in his comment",
      commentCreated : "has commented in your post"
    },
    greeting: {
      welcome: "Welcome to Pul.com",
      introduce:
        "Pul is a social network platform developed by private base on respecting your speak and your think.",
    },
    controls: {
      search: "Search...",
      openFriendsList: "Open Friends List",
      closeFriendsList: "Close Friends List",
    },
    contacts: {
      contactsList: "Contacts",
      title: "Contacts Management",
      userSentRequest: "Users have received request",
      userReceivedRequest: "Users have sent request",
      friendsList: "Friends",
      cancelRequest: "Cancel",
      acceptRequest: "Accept",
      rejectRequest: "Reject",
      getMore: "Get More",
    },
    post : {
      post : "Post", 
      postPlaceholder : "What's on your mind?",            
      status : [
        {
          name: "public",
          icon: () => <FaGlobeAmericas />,
        },
       
        {
          name : "friends",
          icon : () => <FaUserFriends/>
        },
        {
          name: "private",
          icon: () => <BiLockAlt />,
        },
      ],
      controls: {
        like : {
          name : "Like",
          icon : () => <BiLike/>
        }, 
        liked : {
          name : "Liked",
          icon : () => <BiLike/>
        } ,
        comment: {
          name : "Comment",
          icon : () => <BiCommentDetail/>
        },
        share : {
          name : "Share",
          icon : () => <BiShareAlt/>
        },
        countComments: (count) => `${count} comments`
      },
      
    },
    comment : {
      controls: {
        like : "Like",
        liked : "Liked", 
        response : "Response",
        remove : "Remove",
        loadMoreResponses : "Load More Responses"
      },
      commentInputPlaceholder : "Comment here...",
      commentPlaceholder : "Enter your comment here",
      fetchMoreComments : "Get more comments",      
    },
    chat : {
      chatInputPlaceholder : `Send message to`
    },
    dialog: {
      agree: "Agree", 
      disagree : "Cancel",
      removeComment : {
        title : "Warning", 
        content : "Do you want to remove this comment?",
      }
    }
  },
};
