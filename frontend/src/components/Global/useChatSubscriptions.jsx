import React,{useEffect} from 'react'
import {SENT_MESSAGE_CHAT_SUBSCRIPTION} from "../../apollo/operations/subscriptions/chat/sentMessageChatSubscription"
import {FETCH_INITIAL_CHAT_MESSAGES} from "../../apollo/operations/queries/chat/fetchInitialChatMessages"
import {useQuery} from "@apollo/client"
import {GET_CURRENT_USER} from "../../apollo/operations/queries/cache"
import {cacheMutations} from "../../apollo/operations/mutations/cache"
const useChatSubscriptions = () => {
  const {subscribeToMore : subscribeChatMessage} = useQuery(FETCH_INITIAL_CHAT_MESSAGES, {skip : true , fetchPolicy : "cache-and-network"});
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-only"});
  const {setMessagesStorage} = cacheMutations
  useEffect(() => {
    let unsubscribeChatMessage;
    if(subscribeChatMessage && user){
      unsubscribeChatMessage = subscribeChatMessage({
        document : SENT_MESSAGE_CHAT_SUBSCRIPTION,
        variables : {userId : user._id},
        updateQuery : (_, {subscriptionData}) => {
          const {action, status, message} = subscriptionData.data.sentMessageChatSubscription;
          const {sender} = message          
          setMessagesStorage(sender, message, status, false);
        }
      })
    }
    return () => {
      if(unsubscribeChatMessage){
        unsubscribeChatMessage();
      }
    }
  }, [subscribeChatMessage, user])
  return (
    <div>
      
    </div>
  )
}

export default useChatSubscriptions
