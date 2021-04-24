import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../apollo/cache";

import io from "socket.io-client";
import _ from "lodash";
import {updateUserOnlineOfflineMessagesStorage} from "../apollo/chat/chat.caches"
import {updateUserOnlineOffline} from "../apollo/contact/contact.caches"
const useUserStatusSubscriptions = () => {
  const user = useReactiveVar(userVar); 
 
  useEffect(() => {
    const socket = io("http://localhost:5000");

    if (user) {
      console.log("render");
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
      socket.on("server-send-user-is-offline", (userId) => {
        updateUserOnlineOffline({ _id: userId }, false);
        updateUserOnlineOfflineMessagesStorage(userId, false);
      });
    } else {
      socket.disconnect();
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user]);
};

export default useUserStatusSubscriptions;
