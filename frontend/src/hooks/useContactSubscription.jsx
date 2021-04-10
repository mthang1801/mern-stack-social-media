import {useEffect} from "react";
import { FETCH_CURRENT_USER } from "../apollo/operations/queries/user";
import { cacheMutations } from "../apollo/operations/mutations/cache";
import {useQuery} from "@apollo/client"
import subscriptions from "../apollo/operations/subscriptions";
import {GET_CONTACT_CACHE_DATA} from "../apollo/operations/queries/cache"
const useContactSubscription = () => {
  const {data : {user,receivedRequestsToAddFriend,currentPersonalUser,friends}} = useQuery(GET_CONTACT_CACHE_DATA)
  const {setReceivedRequestsToAddFriend, setCurrentUser, setCurrentPersonalUser, setFriends} = cacheMutations
  const {    
    subscribeToMore: subscribeUser,
  } = useQuery(FETCH_CURRENT_USER, { skip: true });
  
  //function to handle when subscription called
  const updateSubscriptionOnChange = (sender, receiver) => {
    setCurrentUser({
      ...user,
      friends: [...sender.friends],     
      following: [...sender.following],      
      sentRequestToAddFriend: [...sender.sentRequestToAddFriend],
    });
    if (
      currentPersonalUser &&
      currentPersonalUser._id.toString() === receiver._id.toString()
    ) {
      setCurrentPersonalUser({
        ...currentPersonalUser,
        friends: [...receiver.friends],
        followed: [...receiver.followed],        
        receivedRequestsToAddFriend: [...receiver.receivedRequestToAddFriend],        
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
          console.log(sender)
          console.log(receiver);
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
          } = subscriptionData.data.removeFriendSubscription;
          updateSubscriptionOnChange(sender, receiver);
          const updatedFriends = friends.filter(friend => friend._id !== sender._id);
          setFriends(updatedFriends)
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
