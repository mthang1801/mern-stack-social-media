export const initialState = {
  user: null,
  currentPersonalUser : null, 
  currentChat : null, 
  messagesStorage : {},
  numberOfConversations : 0,
  posts : [],
  toggleMenu: true,
  alertDialog: { agree: false, title: "", content: "", data: null },
  toggleFriendsBoard : false,
  notifications : [],
  countNumberOfNotificationUnseen : null,
  newNotifications : new Set(),
  latestNotification : null,
  friends : [],
  sentRequestToAddFriend : [],
  receivedRequestsToAddFriend : [],  
  contact : {
    friends : [], 
    sentRequestsToAddFriend : [], 
    receivedRequestsToAddFriend : []
  }
};
