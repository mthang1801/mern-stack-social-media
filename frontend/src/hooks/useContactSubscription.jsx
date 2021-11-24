import { useEffect } from 'react';
import { FETCH_CURRENT_USER } from '../apollo/user/user.types';
import { useQuery, useReactiveVar } from '@apollo/client';
import {
  userVar,
  receivedRequestsToAddFriendVar,
  currentPersonalUserVar,
} from '../apollo/cache';
import {
  REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
  REMOVE_FRIEND_SUBSCRIPTION,
} from '../apollo/contact/contact.subscriptions';
import { removeNotificationItemFromNotificationsList } from '../apollo/notification/notification.caches';
import { setCurrentUser } from '../apollo/user/user.caches';
import { setCurrentPersonalUser } from '../apollo/user/currentPersonalUser.caches';
import {
  removeSentRequestToAddFriend,
  removeFriendsFromContact,
} from '../apollo/contact/contact.caches';

const useContactSubscription = () => {
  const user = useReactiveVar(userVar);
  const receivedRequestsToAddFriend = useReactiveVar(
    receivedRequestsToAddFriendVar
  );
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);

  const { subscribeToMore: subscribeUser } = useQuery(FETCH_CURRENT_USER, {
    skip: true,
  });

  //function to handle when subscription called
  const updateSubscriptionOnChange = (sender, receiver) => {
    setCurrentUser({
      ...user,
      ...sender,
    });

    if (
      currentPersonalUser &&
      currentPersonalUser._id.toString() === receiver._id.toString()
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        ...receiver,
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
          const { sender, receiver } =
            subscriptionData.data.rejectRequestToAddFriendSubscription;
          removeSentRequestToAddFriend(receiver);
          updateSubscriptionOnChange(sender, receiver);
        },
      });

      unsubscribeRemoveFriend = subscribeUser({
        document: REMOVE_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const { sender, receiver, notification } =
            subscriptionData.data.removeFriendSubscription;
          console.log(subscriptionData);
          removeFriendsFromContact(sender);
          removeNotificationItemFromNotificationsList(notification);
          updateSubscriptionOnChange(receiver, sender);
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
  }, [subscribeUser, user, receivedRequestsToAddFriend]);
};

export default useContactSubscription;
