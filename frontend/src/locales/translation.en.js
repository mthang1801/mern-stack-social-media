import React from 'react';
import {
  FaHome,
  FaUserFriends,
  FaShopify,
  FaGlobeAmericas,
} from 'react-icons/fa';
import { AiOutlineGlobal, AiOutlineSave } from 'react-icons/ai';
import { ImNewspaper } from 'react-icons/im';
import { HiOutlineUserGroup } from 'react-icons/hi';
import {
  IoIosNotifications,
  IoMdApps,
  IoMdTrendingUp,
  IoMdPhotos,
  IoIosChatbubbles,
  IoMdGlobe,
} from 'react-icons/io';
import { CgMoreO } from 'react-icons/cg';
import { MdCardMembership, MdInsertEmoticon } from 'react-icons/md';
import { BsChatDots } from 'react-icons/bs';
import { RiContactsBook2Line } from 'react-icons/ri';
import { BiLockAlt, BiLike, BiCommentDetail, BiShareAlt } from 'react-icons/bi';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { VscPinned } from 'react-icons/vsc';

export const en = {
  translation: {
    navigationAuth: [
      {
        path: '/',
        name: 'Home',
        icon: () => <FaHome />,
      },
      {
        path: '/explorer',
        name: 'Explorer',
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: '/news',
        name: 'News',
        icon: () => <ImNewspaper />,
      },
      {
        path: '/contacts',
        name: 'Contacts',
        icon: () => <FaUserFriends />,
      },
      {
        path: '/groups',
        name: 'Groups',
        icon: () => <HiOutlineUserGroup />,
      },
    ],
    menuList: [
      {
        path: '/',
        name: 'Home',
        icon: () => <FaHome />,
      },
      {
        path: '/notifications',
        name: 'Notifications',
        icon: () => <IoIosNotifications />,
      },
      {
        path: '/contacts',
        name: 'Contacts',
        icon: () => <FaUserFriends />,
      },
      {
        path: '/conversations',
        name: 'Conversations',
        icon: () => <IoIosChatbubbles />,
      },
      {
        path: '/groups',
        name: 'Groups',
        icon: () => <HiOutlineUserGroup />,
      },
      {
        path: '/explores',
        name: 'Explores',
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: '/news',
        name: 'News',
        icon: () => <ImNewspaper />,
      },
      {
        path: '/more',
        name: 'More',
        icon: () => <CgMoreO />,
      },
    ],
    personalMenus: [
      {
        path: (slug) => `/${slug}/posts`,
        name: 'Posts',
      },
      {
        path: (slug) => `/${slug}/about`,
        name: 'About',
      },
      {
        path: (slug) => `/${slug}/friends`,
        name: 'Friends',
      },
      {
        path: (slug) => `/${slug}/photos`,
        name: 'Photos',
      },
    ],
    explores: [
      {
        path: '/apps',
        name: 'Apps',
        icon: () => <IoMdApps />,
      },
      {
        path: '/upgrade-member',
        name: 'Upgrade member',
        icon: () => <MdCardMembership />,
      },
      {
        path: '/shop',
        name: 'Shop',
        icon: () => <FaShopify />,
      },
      {
        path: '/trends',
        name: 'Trends',
        icon: () => <IoMdTrendingUp />,
      },
    ],
    chatMenus: [
      {
        oldPath: '/chats',
        path: '/conversations',
        name: 'Messages',
        icon: () => <BsChatDots />,
      },
      {
        oldPath: '/chats/contacts',
        path: '/conversations/contacts',
        name: 'Contacts',
        icon: () => <RiContactsBook2Line />,
      },
    ],
    conversationMenus: [
      {
        key: 'home',
        name: 'Conversations',
        icon: () => <BsChatDots />,
      },
      {
        key: 'contacts',
        name: 'Contacts',
        icon: () => <RiContactsBook2Line />,
      },
      {
        key: 'groups',
        name: 'Groups',
        icon: () => <HiOutlineUserGroup />,
      },
    ],
    statusFooter: [
      {
        name: 'Photos/Videos',
        icon: () => <IoMdPhotos />,
        color: 'var(--success)',
      },
      {
        name: 'Emoji',
        icon: () => <MdInsertEmoticon />,
        color: 'var(--orange)',
      },
    ],
    auth: {
      requestAuth: 'You need to login or signup to continue',
      login: 'Login Your Account',
      signup: 'Sign up Your Account',
      signout: 'Sign Out This Account',
      buttons: {
        login: 'Login',
        signup: 'Signup',
        signout: 'Signout',
      },
    },
    mindText: "What's on your mind?",
    menu: 'Menu',
    notifications: {
      message: 'You have just received a new message.',
      postCreated: 'has just posted a new status.',
      sentRequestToAddFriend: 'send you a request to add friend',
      acceptRequestToAddFriend: 'has accepted your request to add friend.',
      post: {
        postMentioned: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> has mentioned you in post <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong>`,

        likePost: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> Liked your post <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong>`,
      },
      comment: {
        commentMentioned: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> has mentioned you in his comment`,
        commentCreated: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> has commented in your post <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong>`,
        commentLiked: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> liked your comment <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong>`,
      },
      response: {
        responseCreated: (creatorName, postShortenText, commentShortenText) =>
          `<strong>${creatorName}</strong> has responsed at comment ${
            commentShortenText ? commentShortenText.slice(0, 50) + '...' : ''
          } in the post <strong>${
            postShortenText ? postShortenText.slice(0, 50) + '...' : ''
          }</strong>`,
        responseMentioned: (creatorName, postShortenText, commentShortenText) =>
          `<strong>${creatorName}</strong> has mentioned you at comment ${
            commentShortenText ? commentShortenText.slice(0, 50) + '...' : ''
          } in the post <strong>${
            postShortenText ? postShortenText.slice(0, 50) + '...' : ''
          }</strong>`,
        responseLiked: (creatorName, postShortenText, commentShortenText) =>
          `<strong>${creatorName}</strong> has liked your comment ${
            commentShortenText ? commentShortenText.slice(0, 50) + '...' : ''
          } in the post <strong>${
            postShortenText ? postShortenText.slice(0, 50) + '...' : ''
          }</strong>`,
      },
      contact: {
        sentRequestToAddFriend: (senderName) =>
          `<strong>${senderName}</strong> sent to you an invitation to make friend`,
        acceptRequestToAddFriend: (senderName) =>
          `<strong>${senderName}</strong> has accepted your request to add friend. From now, you and ${senderName} are friends.`,
      },
      controls: {
        accept: 'Chấp nhận',
        reject: 'Từ chối',
      },
    },
    greeting: {
      welcome: 'Welcome to Pul.com',
      introduce:
        'Pul is a social network platform developed by private base on respecting your speak and your think.',
    },
    controls: {
      search: 'Search...',
      openFriendsList: 'Open Friends List',
      closeFriendsList: 'Close Friends List',
    },
    contacts: {
      contactsList: 'Contacts',
      title: 'Contacts Management',
      userSentRequest: 'Users have received request',
      userReceivedRequest: 'Users have sent request',
      friendsList: 'Friends',
      cancelRequest: 'Cancel',
      acceptRequest: 'Accept',
      rejectRequest: 'Reject',
      getMore: 'Get More',
    },
    post: {
      post: 'Post',
      heading: {
        settingOwnPost: {
          pinPost: {
            name: 'Pin the post',
            icon: <VscPinned />,
          },
          savePost: {
            name: 'Save the post',
            icon: <AiOutlineSave />,
          },
          editPost: {
            name: 'Edit Post',
            icon: <FiEdit />,
          },
          editAudience: {
            name: 'Edit Audience',
            icon: <IoMdGlobe />,
          },
          moveToTrash: {
            name: 'Move To trash',
            icon: <FiTrash />,
          },
        },
      },
      postPlaceholder: "What's on your mind?",
      status: [
        {
          key: 'PUBLIC',
          name: 'public',
          icon: () => <FaGlobeAmericas />,
        },

        {
          key: 'FRIENDS',
          name: 'friends',
          icon: () => <FaUserFriends />,
        },
        {
          key: 'PRIVATE',
          name: 'private',
          icon: () => <BiLockAlt />,
        },
      ],
      controls: {
        like: {
          name: 'Like',
          icon: () => <BiLike />,
        },
        liked: {
          name: 'Liked',
          icon: () => <BiLike />,
        },
        comment: {
          name: 'Comment',
          icon: () => <BiCommentDetail />,
        },
        share: {
          name: 'Share',
          icon: () => <BiShareAlt />,
        },
        countComments: (count) => `${count} comments`,
      },
    },
    comment: {
      controls: {
        like: 'Like',
        liked: 'Liked',
        response: 'Response',
        remove: 'Remove',
        loadMoreResponses: 'Load More Responses',
      },
      commentInputPlaceholder: 'Comment here...',
      commentPlaceholder: 'Enter your comment here',
      fetchMoreComments: 'Get more comments',
    },
    chat: {
      chatInputPlaceholder: `Send message to`,
    },
    dialog: {
      agree: 'Agree',
      disagree: 'Cancel',
      removeComment: {
        title: 'Warning',
        content: 'Do you want to remove this comment?',
      },
    },
    settingAccountDialog: {
      profile: 'Go to profile',
      appearance: 'Appearance',
      language: 'Language',
      settingAndPrivacy: 'Settings & Privacies',
      logout: 'Logout',
    },
    cards: {
      friends: 'Friends',
      following: 'Followings',
      followed: 'Followed',
    },
    search: {
      notfound: 'Result not found.',
    },
    conversations: {
      contact: {
        dialog: {
          viewInformation: 'Xem thông tin',
          setLabel: 'Set Label',
          markFavorite: 'Đánh dấu yêu thích',
          removeFriend: 'Huỷ kết bạn',
        },
      },
    },
    utility: {
      loading: 'Loading',
    },
    alert: {
      developing: 'This current page is being developed, we come back soon.',
    },
  },
};
