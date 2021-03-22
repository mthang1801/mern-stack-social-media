import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER, GET_FRIENDS } from "../../apollo/operations/queries/cache";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import io from "socket.io-client";
import _ from "lodash"
const useUserStatusSubscriptions = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-only" });
  const {  updateUserOnlineOffline, updateUserOnlineOfflineMessagesStorage } = cacheMutations;
  useEffect(() => {
    const socket = io("http://localhost:5000") ; 
    
    if (user) {      
      //pass socket to backend to update status online 
      socket.open();     
      const { _id, name, slug, avatar } = user;     
      socket.emit("client-send-user-info", {
        _id,
        name,
        slug,
        avatar,
        isOnline: true,
      });
      socket.on("server-send-user-online", (data) => {
        updateUserOnlineOffline(data);
        updateUserOnlineOfflineMessagesStorage(data._id);
      });
      socket.on("server-send-user-is-offline", userId => {
        updateUserOnlineOffline({_id : userId},false)
        updateUserOnlineOfflineMessagesStorage(userId, false);
      })
    }else{
      socket.disconnect();
    }
    return () => {
      if(socket){
        socket.close()        
      }
    }
  }, [user]);
};

export default useUserStatusSubscriptions;
