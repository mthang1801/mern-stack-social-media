import { useEffect } from "react";
import { FETCH_CURRENT_USER } from "../apollo/user/user.types";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
  userVar,
  receivedRequestsToAddFriendVar,
  currentPersonalUserVar,
  friendsVar,
  latestNotificationVar,
} from "../apollo/cache";
import {
  REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  REMOVE_FRIEND_SUBSCRIPTION,
} from "../apollo/contact/contact.subscriptions";
import {
  removeNewNotification,
  decreaseCountNumberNotificationsUnseen,
  removeNotificationItemFromNotificationsList,
  setLatestNotification,
  removeNotificationWhenUserRejectToAddFriend
} from "../apollo/notification/notification.caches";
import { setCurrentUser } from "../apollo/user/user.caches";
import { setCurrentPersonalUser } from "../apollo/user/currentPersonalUser.caches";
import {removeSentRequestToAddFriend, removeFriendsFromContact} from "../apollo/contact/contact.caches"

const useContactSubscription = () => {
  const user = useReactiveVar(userVar);
  const receivedRequestsToAddFriend = useReactiveVar(
    receivedRequestsToAddFriendVar
  );
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const friends = useReactiveVar(friendsVar);
  const latestNotification = useReactiveVar(latestNotificationVar);

  const { subscribeToMore: subscribeUser } = useQuery(FETCH_CURRENT_USER, {
    skip: true,
  });

  //function to handle when subscription called
  const updateSubscriptionOnChange = (
    sender,
    receiver,
    removedNotification
  ) => {
    if (
      removedNotification &&
      user.notifications.includes(removedNotification._id)
    ) {
      if (latestNotification?._id === removedNotification._id) {
        setLatestNotification(null);
      }      
      removeNotificationItemFromNotificationsList(removedNotification);
      setCurrentUser({
        ...user,
        ...receiver,
        notifications: [
          ...user.notifications.filter(
            (_id) => _id !== removedNotification._id
          ),
        ],

      });
    } else {
      setCurrentUser({
        ...user,
        friends: [...receiver.friends],
        following: [...receiver.following],
        followed: [...receiver.followed],
        sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
        receivedRequestsToAddFriend: [...receiver.receivedRequestToAddFriend],
      });
    }

    if (
      currentPersonalUser &&
      currentPersonalUser._id.toString() === sender._id.toString()
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...sender.friends],
        following: [...sender.following],
        followed: [...sender.followed],
        receivedRequestsToAddFriend: [...sender.receivedRequestToAddFriend],
        sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
      });
    }
  };
  useEffect(() => {
    let unsubscribeRejectRquestToAddFriend,
      unsubscribeCancelRequestToAddFriend,
      unsubscribeRemoveFriend;
    if (subscribeUser && user) {
      unsubscribeRejectRquestToAddFriend = subscribeUser({
        document: REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
            notification
          } = subscriptionData.data.rejectRequestToAddFriendSubscription;          
          removeSentRequestToAddFriend(receiver);          
          updateSubscriptionOnChange(sender, receiver);
        },
      });

      unsubscribeRemoveFriend = subscribeUser({
        document: REMOVE_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
            notification,
          } = subscriptionData.data.removeFriendSubscription;
          console.log(subscriptionData)
          // removeFriendsFromContact(sender);
          // removeNotificationItemFromNotificationsList(notification)
          updateSubscriptionOnChange(sender, receiver, notification);
        },
      });
    }

    return () => {
      if (unsubscribeCancelRequestToAddFriend) {
        unsubscribeCancelRequestToAddFriend();
      }
      if (unsubscribeRejectRquestToAddFriend) {
        unsubscribeRejectRquestToAddFriend();
      }
      if (unsubscribeRemoveFriend) {
        unsubscribeRemoveFriend();
      }
    };
  }, [subscribeUser, user, receivedRequestsToAddFriend, friends]);
};

export default useContactSubscription;
