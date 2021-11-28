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

export const vi = {
  translation: {
    navigationAuth: [
      {
        path: '/',
        name: 'Trang chủ',
        icon: () => <FaHome />,
      },
      {
        path: '/explorer',
        name: 'Khám phá',
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: '/news',
        name: 'Bản tin',
        icon: () => <ImNewspaper />,
      },
      {
        path: '/contacts',
        name: 'Danh bạ',
        icon: () => <FaUserFriends />,
      },
      {
        path: '/groups',
        name: 'Nhóm',
        icon: () => <HiOutlineUserGroup />,
      },
    ],
    menuList: [
      {
        path: '/',
        name: 'Trang chủ',
        icon: () => <FaHome />,
      },
      {
        path: '/notifications',
        name: 'Thông báo',
        icon: () => <IoIosNotifications />,
      },
      {
        path: '/contacts',
        name: 'Danh bạ',
        icon: () => <FaUserFriends />,
      },
      {
        path: '/chats',
        name: 'Tin nhắn',
        icon: () => <IoIosChatbubbles />,
      },
      {
        path: '/groups',
        name: 'Nhóm',
        icon: () => <HiOutlineUserGroup />,
      },
      {
        path: '/explores',
        name: 'Khám phá',
        icon: () => <AiOutlineGlobal />,
      },
      {
        path: '/news',
        name: 'Tin mới',
        icon: () => <ImNewspaper />,
      },
      {
        path: '/more',
        name: 'Thêm',
        icon: () => <CgMoreO />,
      },
    ],
    personalMenus: [
      {
        path: (slug) => `/${slug}/posts`,
        name: 'Bài đăng',
      },
      {
        path: (slug) => `/${slug}/about`,
        name: 'Giới thiệu',
      },
      {
        path: (slug) => `/${slug}/friends`,
        name: 'Bạn bè',
      },
      {
        path: (slug) => `/${slug}/photos`,
        name: 'Hình ảnh',
      },
    ],
    chatMenus: [
      {
        path: '/chats',
        name: 'Tin nhắn',
        icon: () => <BsChatDots />,
      },
      {
        path: '/chats/contacts',
        name: 'Danh bạ',
        icon: () => <RiContactsBook2Line />,
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
    statusFooter: [
      {
        name: 'Hình ảnh/ Videos',
        icon: () => <IoMdPhotos />,
      },
      {
        name: 'Cảm xúc',
        icon: () => <MdInsertEmoticon />,
      },
    ],
    auth: {
      requestAuth:
        'Bạn cần đăng nhập vào tài khoản trước khi thực hiện tác vụ này',
      login: 'Đăng nhập Tài khoản',
      signup: 'Đăng ký Tài khoản',
      signout: 'Đăng xuất',
      buttons: {
        login: 'Đăng nhập',
        signup: 'Đăng ký',
        signout: 'Đăng xuất',
      },
    },
    mindText: 'Bạn đang nghĩ gì?',
    menu: 'Danh mục',
    notifications: {
      message: 'Bạn vừa nhận được một thông báo mới',
      postCreated: 'vừa đăng một trạng thái mới.',
      sentRequestToAddFriend: 'gửi cho bạn một lời mời kết bạn.',
      acceptRequestToAddFriend: 'đã chấp nhận lời mời kết bạn của bạn.',
      post: {
        postMentioned: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> đã nhắc đến bạn trong bài viết <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong> của anh ấy`,

        likePost: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> đã thích bài viết <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong> của bạn`,
      },
      comment: {
        commentMentioned: (creatorName) =>
          `<strong>${creatorName}</strong> đã nhắc đến bạn trong bình luận của anh ấy`,
        commentCreated: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> đã bình luận một bài viết của bạn <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong>`,
        commentLiked: (creatorName, shortenText) =>
          `<strong>${creatorName}</strong> đã thích bình luận <strong>${
            shortenText ? shortenText.slice(0, 50) + '...' : ''
          }</strong> của bạn`,
      },
      response: {
        responseCreated: (creatorName, postShortenText, commentShortenText) =>
          `<strong>${creatorName}</strong> đã phản hồi bình luận ${
            commentShortenText ? commentShortenText.slice(0, 50) + '...' : ''
          } trong bài viết <strong>${
            postShortenText ? postShortenText.slice(0, 50) + '...' : ''
          }</strong>`,
        responseMentioned: (creatorName, postShortenText, commentShortenText) =>
          `<strong>${creatorName}</strong> đã nhắc đến bạn tại bình luận ${
            commentShortenText ? commentShortenText.slice(0, 50) + '...' : ''
          } trong bài viết <strong>${
            postShortenText ? postShortenText.slice(0, 50) + '...' : ''
          }</strong>`,
        responseLiked: (creatorName, postShortenText, commentShortenText) =>
          `<strong>${creatorName}</strong> đã thích bình luận ${
            commentShortenText ? commentShortenText.slice(0, 50) + '...' : ''
          } của bạn trong bài viết <strong>${
            postShortenText ? postShortenText.slice(0, 50) + '...' : ''
          }</strong>`,
      },
      contact: {
        sentRequestToAddFriend: (senderName) =>
          `<strong>${senderName}</strong> đã gửi cho bạn một lời kết bạn.`,
        acceptRequestToAddFriend: (senderName) =>
          `<strong>${senderName}</strong> đã chấp nhận lời mời kết bạn của bạn.`,
      },
      controls: {
        accept: 'Chấp nhận',
        reject: 'Từ chối',
      },
    },
    greeting: {
      welcome: 'Chào mừng bạn đã đến với Pul.com',
      introduce:
        'Pul là một nền tảng mạng xã hội được phát triển bởi cá nhân tôn trọng tiếng nói và suy nghĩ của người dùng.',
    },
    controls: {
      search: 'Tìm kiếm',
      openFriendsList: 'Hiển thị Danh bạ',
      closeFriendsList: 'Đóng Danh bạ',
    },
    contacts: {
      contactsList: 'Bạn bè',
      title: 'Quản lý liên lạc',
      userSentRequest: 'Yêu cầu kết bạn đến',
      userReceivedRequest: 'Lời mời kết bạn từ',
      friendsList: 'Bạn bè',
      cancelRequest: 'Hủy Yêu cầu',
      acceptRequest: 'Chấp nhận',
      rejectRequest: 'Từ chối',
      getMore: 'Tải thêm',
    },
    post: {
      post: 'Đăng bài viết',
      postPlaceholder: 'Chia sẻ cảm nghĩ của bạn',
      heading: {
        settingOwnPost: {
          pinPost: {
            name: 'Ghim bài viết',
            icon: <VscPinned />,
          },
          savePost: {
            name: 'Lưu bài viết',
            icon: <AiOutlineSave />,
          },
          editPost: {
            name: 'Chỉnh sửa bài viết',
            icon: <FiEdit />,
          },
          editAudience: {
            name: 'Thay đổi người xem',
            icon: <IoMdGlobe />,
          },
          moveToTrash: {
            name: 'Xoá bài viết',
            icon: <FiTrash />,
          },
        },
      },
      status: [
        {
          key: 'public',
          name: 'Công khai',
          icon: () => <FaGlobeAmericas />,
        },
        {
          key: 'friends',
          name: 'Bạn bè',
          icon: () => <FaUserFriends />,
        },
        {
          key: 'private',
          name: 'Cá nhân',
          icon: () => <BiLockAlt />,
        },
      ],
      controls: {
        like: {
          name: 'Thích',
          icon: () => <BiLike />,
        },
        liked: {
          name: 'Đã Thích',
          icon: () => <BiLike />,
        },
        comment: {
          name: 'Bình luận',
          icon: () => <BiCommentDetail />,
        },
        share: {
          name: 'Chia sẻ',
          icon: () => <BiShareAlt />,
        },
        countComments: (count) => `${count} bình luận`,
      },
    },
    comment: {
      controls: {
        like: 'Thích',
        liked: 'Đã thích',
        response: 'Trả lời',
        remove: 'Xóa',
        loadMoreResponses: 'Tải thêm bình luận',
      },
      commentPlaceholder: 'Để lại bình luận của bạn',
      commentInputPlaceholder: 'Để lại bình luận của bạn tại đây',
      fetchMoreComments: 'Xem thêm bình luận',
    },
    chat: {
      chatInputPlaceholder: `Gửi tin nhắn tới`,
    },
    dialog: {
      agree: 'Đồng ý',
      disagree: 'Hủy bỏ',
      removeComment: {
        title: 'Cảnh báo',
        content: 'Bạn có muốn xóa bình luận không?',
      },
    },
    settingAccountDialog: {
      profile: 'Đi đến profile',
      appearance: 'Giao diện',
      language: 'Ngôn ngữ',
      settingAndPrivacy: 'Thiết lập và chính sách',
      logout: 'Đăng xuất',
    },
    cards: {
      friends: 'Bạn bè',
      following: 'Đang theo dõi',
      followed: 'Được theo dõi',
    },
    utility: {
      loading: 'Đang tải',
    },
  },
};
