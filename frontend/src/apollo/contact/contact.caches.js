import { AiOutlineConsoleSql } from 'react-icons/ai';
import { contactVar, userVar } from '../cache';
import { initialState } from '../initialState';
import _ from 'lodash';
export const setContactList = (
  friends,
  receivedRequestsToAddFriend,
  sentRequestsToAddFriend
) => {
  const contact = { ...contactVar() };
  if (friends) contact.friends = [...friends];
  if (receivedRequestsToAddFriend)
    contact.receivedRequestsToAddFriend = [...receivedRequestsToAddFriend];
  if (sentRequestsToAddFriend)
    contact.sentRequestsToAddFriend = [...sentRequestsToAddFriend];
  return contactVar(contact);
};

export const pushFriendsListToContact = (friends) => {
  const contact = { ...contactVar() };
  contact.friends = [...contact.friends, ...friends];
  console.log(contact);
  return contactVar(contact);
};

export const fetchMoreReceivedRequestsToAddFriend = (receivedRequestsData) => {
  const contact = { ...contactVar() };
  contact.receivedRequestsToAddFriend = [
    ...contact.receivedRequestsToAddFriend,
    ...receivedRequestsData,
  ];
  return contactVar(contact);
};

export const fetchMoreSentRequestsToAddFriend = (sentRequestsData) => {
  const contact = { ...contactVar() };
  contact.sentRequestsToAddFriend = [
    ...contact.sentRequestsToAddFriend,
    ...sentRequestsData,
  ];
  return contactVar(contact);
};

export const moveReceivedRequestToFriend = (senderRequest) => {
  const contact = { ...contactVar() };
  contact.receivedRequestsToAddFriend =
    contact.receivedRequestsToAddFriend.filter(
      (receivedUser) => receivedUser._id !== senderRequest._id
    );
  contact.friends = [{ ...senderRequest }, ...contact.friends];
  return contactVar(contact);
};
export const moveSentRequestToFriend = (senderRequest) => {
  const contact = { ...contactVar() };
  contact.sentRequestsToAddFriend = contact.sentRequestsToAddFriend.filter(
    (receivedUser) => receivedUser._id !== senderRequest._id
  );
  contact.friends = [{ ...senderRequest }, ...contact.friends];
  return contactVar(contact);
};

export const removeSentRequestToAddFriend = (receiverRequest) => {
  const contact = { ...contactVar() };
  contact.sentRequestsToAddFriend = contact.sentRequestsToAddFriend.filter(
    (sentUser) => sentUser._id !== receiverRequest._id
  );
  return contactVar(contact);
};

export const addUserToReceivedRequestToAddFriend = (sender) => {
  const contact = { ...contactVar() };
  contact.receivedRequestsToAddFriend = [
    { ...sender },
    ...contact.receivedRequestsToAddFriend,
  ];
  return contactVar(contact);
};

export const removeUserFromReceivedRequestToAddFriend = (sender) => {
  const contact = { ...contactVar() };
  contact.receivedRequestsToAddFriend =
    contact.receivedRequestsToAddFriend.filter(
      (receivedUserRequest) => receivedUserRequest._id !== sender._id
    );
  return contactVar(contact);
};

export const removeReceivedRequestToAddFriend = (senderRequest) => {
  const contact = { ...contactVar() };
  contact.receivedRequestsToAddFriend =
    contact.receivedRequestsToAddFriend.filter(
      (receivedRequest) => receivedRequest._id !== senderRequest._id
    );
  return contactVar(contact);
};

export const removeFriendsFromContact = (friend) => {
  const contact = { ...contactVar() };
  contact.friends = contact.friends.filter(
    (_friend) => _friend._id !== friend._id
  );
  return contactVar(contact);
};

export const clearContact = () => contactVar(initialState.contact);

export const updateUserOnlineOffline = (user, isOnline = true) => {
  let contact = { ...contactVar() };
  if (typeof isOnline === 'boolean') {
    if (isOnline) {
      //update user is online
      if (
        contact.friends.find(
          (friend) => friend._id.toString() === user._id.toString()
        )
      ) {
        contact.friends = contact.friends.filter(
          (friend) => friend._id.toString() !== user._id.toString()
        );
        contact.friends = [{ ...user }, ...contact.friends];
      }
      return contactVar(contact);
    }
    //update user is Offline
    const { _id } = user;
    if (_id) {
      contact.friends = contact.friends.map((friend) => {
        let updatedFriends = { ...friend };
        if (updatedFriends._id.toString() === _id.toString()) {
          updatedFriends.isOnline = false;
          updatedFriends.offlinedAt = new Date();
        }
        return { ...updatedFriends };
      });
      contact.friends = _.orderBy(
        contact.friends,
        [
          function (item) {
            return item.isOnline;
          },
          function (item) {
            return item.slug;
          },
        ],
        ['desc', 'asc']
      );
      return contactVar(contact);
    }
  }
};
