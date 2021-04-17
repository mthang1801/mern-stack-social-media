import { useEffect, useState } from "react";
import userActionTypes from "./user.types";
import { useQuery } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../cache";

export const addFetchedFriendsToFriendsData = (fetchedFriends) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(fetchedFriends)
      if (!Array.isArray(fetchedFriends)) {
        throw new Error("Friends must be array");
      }
      const user = {...userVar()};
      user.friendsData = user.friendsData ? [...user.friendsData, ...fetchedFriends] : [...fetchedFriends];
      userVar(user);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
