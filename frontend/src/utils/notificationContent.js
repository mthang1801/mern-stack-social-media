import i18n from "../i18n"

const notificationContent = (notification, lang) => {
  const {notifications : {post : postNotification, comment : commentNotification, response : responseNotification,  contact : contactNotification}} = i18n.store.data[lang].translation;
  let { field, content} = notification;
  field = field.toUpperCase();
  content = content.toUpperCase();    
  
  switch(field){
    case "POST" : 
      switch(content){        
        case "MENTIONED" : {          
          return postNotification.postMentioned(notification.creator?.name, notification.fieldIdentity?.post?.shortenText); 
        };
        case "LIKED" :           
          return postNotification.likePost(notification.creator?.name, notification.fieldIdentity?.post?.shortenText);
        
      }
    case "COMMENT" : 
      switch(content){
        case "MENTIONED" : return commentNotification.commentMentioned(notification.creator?.name, notification.fieldIdentity?.post?.shortenText); 
        case "CREATED" : return commentNotification.commentCreated(notification.creator?.name, notification.fieldIdentity?.post?.shortenText);
        case "LIKED" : return commentNotification.commentLiked(notification.creator?.name, notification.fieldIdentity?.comment?.shortenText);
      }
    case "RESPONSE" : 
      switch(content){
        case "CREATED" : return responseNotification.responseCreated(notification.creator?.name, notification.fieldIdentity?.post?.shortenText, notification.fieldIdentity?.comment?.shortenText);
        case "MENTIONED" : return responseNotification.responseMentioned(notification.creator?.name, notification.fieldIdentity?.post?.shortenText, notification.fieldIdentity?.comment?.shortenText);
        case "LIKED" : return responseNotification.responseLiked(notification.creator?.name, notification.fieldIdentity?.post?.shortenText, notification.fieldIdentity?.comment?.shortenText);
      }
    case "CONTACT" : 
      switch(content){
        case "SENT_REQUEST_TO_ADD_FRIEND" : return contactNotification.sentRequestToAddFriend(notification.creator?.name);
        case "ACCEPT_REQUEST_TO_ADD_FRIEND" : return contactNotification.acceptRequestToAddFriend(notification.creator?.name);
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