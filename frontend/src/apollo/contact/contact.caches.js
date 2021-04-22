import {contactVar, userVar} from "../cache"

export const setContactList = (friends, receivedRequestsToAddFriend, sentRequestsToAddFriend) => {  
  const contact = {...contactVar()};
  if(friends) contact.friends = [...friends];
  if(receivedRequestsToAddFriend) contact.receivedRequestsToAddFriend = [...receivedRequestsToAddFriend];
  if(sentRequestsToAddFriend) contact.sentRequestsToAddFriend = [...sentRequestsToAddFriend];
  return contactVar(contact);
}

export const fetchMoreFriendsToContact = friends => {
  const contact = {...contactVar()};
  contact.friends = [...contact.friends, ...friends]
  return contactVar(contact);
}

export const fetchMoreReceivedRequestsToAddFriend = receivedRequestsData => {
  const contact = {...contactVar()};
  contact.receivedRequestsToAddFriend = [...contact.receivedRequestsToAddFriend, ...receivedRequestsData];
  return contactVar(contact);
}

export const fetchMoreSentRequestsToAddFriend = sentRequestsData => {
  const contact = {...contactVar()};
  contact.sentRequestsToAddFriend = [...contact.sentRequestsToAddFriend, ...sentRequestsData];
  return contactVar(contact);
}

export const moveReceivedRequestToFriend = senderRequest => {
  const contact = {...contactVar()};
  contact.receivedRequestsToAddFriend = contact.receivedRequestsToAddFriend.filter(receivedUser => receivedUser._id !== senderRequest._id);
  contact.friends = [{...senderRequest}, ...contact.friends];
  return contactVar(contact);
}
export const moveSentRequestToFriend = senderRequest => {
  const contact = {...contactVar()};
  contact.sentRequestsToAddFriend = contact.sentRequestsToAddFriend.filter(receivedUser => receivedUser._id !== senderRequest._id);
  contact.friends = [{...senderRequest}, ...contact.friends];
  return contactVar(contact);
}

export const removeSentRequestToAddFriend = receiverRequest => {
  const contact = {...contactVar()};
  contact.sentRequestsToAddFriend = contact.sentRequestsToAddFriend.filter(sentUser => sentUser._id !== receiverRequest._id) ;
  return contactVar(contact);
}

export const addUserToReceivedRequestToAddFriend = sender => {  
  const contact = {...contactVar()};  
  contact.receivedRequestsToAddFriend = [{...sender}, ...contact.receivedRequestsToAddFriend];
  console.log(contact);
  return contactVar(contact);
}

export const removeUserFromReceivedRequestToAddFriend = sender => {
  const contact = {...contactVar()};
  contact.receivedRequestsToAddFriend =contact.receivedRequestsToAddFriend.filter(receivedUserRequest =>  receivedUserRequest._id !== sender._id) 
  return contactVar(contact);
}

export const removeReceivedRequestToAddFriend = senderRequest => {
  const contact = {...contactVar()};
  contact.receivedRequestsToAddFriend = contact.receivedRequestsToAddFriend.filter(receivedRequest => receivedRequest._id !== senderRequest._id);
  return contactVar(contact);
}

export const removeFriendsFromContact = friend => {
  const contact = {...contactVar()};
  contact.friends = contact.friends.filter(_friend => _friend._id !== friend._id);
  return contactVar(contact);
}