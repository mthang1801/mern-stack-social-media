import { useEffect } from "react";
import userActionTypes from "./user.types";
import { useQuery } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../cache";
export const useFetchCurrentUser = (isAuth) => {
  const {
    refetch: fetchCurrentUser,
  } = useQuery(userActionTypes.FETCH_CURRENT_USER, {
    skip: true,
    notifyOnNetworkStatusChange: true,
  });
  const user = userVar();
  
  useEffect(() => {
    let _isMounted = true;
    if (fetchCurrentUser && !user) {
      fetchCurrentUser().then(({ data }) => {
        if (data && _isMounted) {
          userVar(data.fetchCurrentUser);
        }
      });
    }
    return () => (_isMounted = false);
  }, [isAuth, fetchCurrentUser, user]);
};
