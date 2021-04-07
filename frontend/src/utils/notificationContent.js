import i18n from "../i18n"

const notificationContent = (notification, lang) => {
  const {notifications} = i18n.store.data[lang].translation;
  let { field, content} = notification;
  field = field.toUpperCase();
  content = content.toUpperCase();    
  
  switch(field){
    case "POST" : 
      switch(content){        
        case "MENTIONED" : {          
          return notifications.postMentioned(notification.creator?.name, notification.fieldIdentity?.post?.shortenText); 
        };
        case "LIKED" :           
          return notifications.likePost(notification.creator?.name, notification.fieldIdentity?.post?.shortenText);
        
      }
    case "USER" : 
      switch(content){
        case "ADDED" : return  notifications.sentRequestToAddFriend;
        case "ACCEPTED" : return notifications.acceptRequestToAddFriend
      }
    case "COMMENT" : 
      switch(content){
        case "MENTIONED" : return notifications.commentMentioned(notification.creator?.name, notification.fieldIdentity?.post?.shortenText); 
        case "CREATED" : return notifications.commentCreated(notification.creator?.name, notification.fieldIdentity?.post?.shortenText);
        case "LIKED" : return notifications.commentLiked(notification.creator?.name, notification.fieldIdentity?.comment?.shortenText);
      }
    case "RESPONSE" : 
      switch(content){
        case "CREATED" : return notifications.responseCreated(notification.creator?.name, notification.fieldIdentity?.post?.shortenText, notification.fieldIdentity?.comment?.shortenText);
        case "MENTIONED" : return notifications.responseMentioned(notification.creator?.name, notification.fieldIdentity?.post?.shortenText, notification.fieldIdentity?.comment?.shortenText);
        case "LIKED" : return notifications.responseLiked(notification.creator?.name, notification.fieldIdentity?.post?.shortenText, notification.fieldIdentity?.comment?.shortenText);
      }
  }
}

const showResponseButtons = (notification, user) => {
  const field = notification.field.toLowerCase();
  const content = notification.content.toUpperCase();
  if(field === "user" && content === "ADDED" && user.receivedRequestToAddFriend.includes(notification.creator._id)){
    return true ; 
  }
  return false ;
}

export {notificationContent , showResponseButtons}