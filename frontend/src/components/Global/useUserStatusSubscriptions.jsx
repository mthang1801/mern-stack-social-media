import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../apollo/operations/queries/cache/getCurrentUser";
import { GET_FRIENDS } from "../../apollo/operations/queries/cache/getFriends";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import io from "socket.io-client";
const useUserStatusSubscriptions = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-only" });
  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-only" });
  const { setFriends } = cacheMutations;
  useEffect(() => {
    if (user) {
      //pass socket to backend to update status online
      const socket = io("http://localhost:5000");
      const { _id, name, slug, avatar } = user;
      socket.emit("client-send-user-info", {
        _id,
        name,
        slug,
        avatar,
        isOnline: true,
      });
      socket.on("server-send-user-online", (data) => {
        console.log(data);
        const { _id } = data;
        let _friends = [...friends];
        if (user.friends.includes(_id)) {
          if (_friends.findIndex((friend) => friend._id === _id) !== -1) {
            _friends = _friends.filter(
              (friend) => friend._id.toString() !== _id.toString()
            );
          }
          _friends.unshift({ ...data });
          console.log(_friends)
          setFriends([..._friends]);
        }
      });
    }
  }, [user, friends, setFriends]);
};

export default useUserStatusSubscriptions;
