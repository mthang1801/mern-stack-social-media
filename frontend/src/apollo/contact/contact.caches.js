import {contactVar} from "../cache"

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

export const removeSentRequestToAddFriend = receiverRequest => {
  const contact = {...contactVar()};
  contact.sentRequestsToAddFriend = contact.sentRequestsToAddFriend.filter(sentUser => sentUser._id !== receiverRequest._id) ;
  return contactVar(contact);
}