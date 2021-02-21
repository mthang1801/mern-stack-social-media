import i18n from "../i18n"

const notificationContent = (field, action, lang) => {
  const {translation} = i18n.store.data[lang];
  field = field.toLowerCase();
  action = action.toUpperCase();
  if (field === "post" && action === "CREATED") {
    return translation.notifications.postCreated;
  }
  if(field === "user" && action === "ADDED"){
    return translation.notifications.sendRequestToAddFriend
  }
}

const showResponseButtons = (notification, user) => {
  const field = notification.field.toLowerCase();
  const action = notification.action.toUpperCase();
  if(field === "user" && action === "ADDED" && user.receiveRequestToAddFriend.includes(notification.creator._id)){
    return true ; 
  }
  return false ;
}

export {notificationContent , showResponseButtons}