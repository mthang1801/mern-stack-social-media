import {useEffect} from "react";
import { FETCH_CURRENT_USER } from "../apollo/operations/queries/user";
import { cacheMutations } from "../apollo/operations/mutations/cache";
import {useQuery} from "@apollo/client"
import subscriptions from "../apollo/operations/subscriptions";
import {GET_CONTACT_CACHE_DATA} from "../apollo/operations/queries/cache"
const useContactSubscription = () => {
  const {data : {user,receivedRequestsToAddFriend,currentPersonalUser,friends, latestNotification, notifications}} = useQuery(GET_CONTACT_CACHE_DATA)
  const {setReceivedRequestsToAddFriend, setCurrentUser, setCurrentPersonalUser, setFriends, setLatestNotification, removeNewNotification, decreaseNumberNotificationsUnseen,removeNotificationItemFromNotificationsList} = cacheMutations
  const {    
    subscribeToMore: subscribeUser,
  } = useQuery(FETCH_CURRENT_USER, { skip: true });
  
  //function to handle when subscription called 
  const updateSubscriptionOnChange = (sender, receiver, removedNotification) => {  
    if (removedNotification && user.notifications.includes(removedNotification._id)) {      
      if (latestNotification?._id === removedNotification._id) {
        setLatestNotification(null);
      }
      removeNewNotification(removedNotification._id);
      decreaseNumberNotificationsUnseen();
      removeNotificationItemFromNotificationsList(removedNotification);
      setCurrentUser({
        ...user,
        notifications: [
          ...user.notifications.filter((_id) => _id !== removedNotification._id)],
          friends: [...receiver.friends],     
          following: [...receiver.following], 
          followed : [...receiver.followed]     ,
          sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
          receivedRequestsToAddFriend : [...receiver.receivedRequestToAddFriend]
      });
    }else{
      setCurrentUser({
        ...user,
        friends: [...receiver.friends],     
        following: [...receiver.following], 
        followed : [...receiver.followed]     ,
        sentRequestToAddFriend: [...receiver.sentRequestToAddFriend],
        receivedRequestsToAddFriend : [...receiver.receivedRequestToAddFriend]
      });
    }
   
    if (
      currentPersonalUser &&
      currentPersonalUser._id.toString() === sender._id.toString()
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...sender.friends],
        following : [...sender.following],
        followed: [...sender.followed],        
        receivedRequestsToAddFriend: [...sender.receivedRequestToAddFriend],        
        sentRequestToAddFriend : [...sender.sentRequestToAddFriend]
      });
    }
  };
  useEffect(() => {
    let unsubscribeRejectRquestToAddFriend,
      unsubscribeCancelRequestToAddFriend,
      unsubscribeRemoveFriend;
    if (subscribeUser && user) {
      unsubscribeRejectRquestToAddFriend = subscribeUser({
        document:
          subscriptions.userSubscription
            .REJECT_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.rejectRequestToAddFriendSubscription;        
          updateSubscriptionOnChange(sender, receiver);
        },
      });

      unsubscribeCancelRequestToAddFriend = subscribeUser({
        document:
          subscriptions.userSubscription
            .CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.cancelRequestToAddFriendSubscription;

          // remove sender from received requests
          setReceivedRequestsToAddFriend(
            receivedRequestsToAddFriend.filter(
              (senderRequest) => senderRequest._id !== sender._id
            )
          );
          updateSubscriptionOnChange(sender, receiver);
        },
      });

      unsubscribeRemoveFriend = subscribeUser({
        document: subscriptions.userSubscription.REMOVE_FRIEND,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
            notification
          } = subscriptionData.data.removeFriendSubscription;
          console.log(subscriptionData)
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
  }, [subscribeUser, user,receivedRequestsToAddFriend, friends]);

};

export default useContactSubscription;
