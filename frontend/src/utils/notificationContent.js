import i18n from "../i18n"

const notificationContent = (field, action, lang) => {
  const {notifications} = i18n.store.data[lang].translation;
  field = field.toLowerCase();
  action = action.toUpperCase();  

  switch(field){
    case "post" : 
      switch(action){        
        case "MENTION" : {          
          return notifications.postMention; 
        }
      }
    case "user" : 
      switch(action){
        case "ADDED" : return  notifications.sentRequestToAddFriend;
        case "ACCEPTED" : return notifications.acceptRequestToAddFriend
      }
  }
}

const showResponseButtons = (notification, user) => {
  const field = notification.field.toLowerCase();
  const action = notification.action.toUpperCase();
  if(field === "user" && action === "ADDED" && user.receivedRequestToAddFriend.includes(notification.creator._id)){
    return true ; 
  }
  return false ;
}

export {notificationContent , showResponseButtons}