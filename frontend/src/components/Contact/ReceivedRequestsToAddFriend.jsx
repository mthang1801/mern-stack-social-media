import React, { useEffect } from "react";
import {
  FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND,  
} from "../../apollo/user/user.types";
import {userVar, receivedRequestsToAddFriendVar} from "../../apollo/cache"
import { useQuery, useReactiveVar } from "@apollo/client";
import { useThemeUI } from "theme-ui";
import { ContactWrapper, Title, LinkReadMore } from "./Contact.styles";
import { setReceivedRequestsToAddFriend } from "../../apollo/user/user.caches";
import useLanguage from "../Global/useLanguage";
import ContactItem from "./ContactItem";
import _ from "lodash"
const SentRequestsToAddFriend = () => {
  const user  = useReactiveVar(userVar);
  const receivedRequestsToAddFriend = useReactiveVar(receivedRequestsToAddFriendVar)
  const { refetch: fetchUsersReceivedRequestToAddFriend } = useQuery(
    FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND,
    {
      fetchPolicy: "cache-and-network",
      skip: true,
    }
  );
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();

  const getMoreUsersReceivedRequestToAddFriend = () => {
    const skip = receivedRequestsToAddFriend.length;
    const limit = +process.env.REACT_APP_CONTACT_USER_PER_PAGE;
    if (fetchUsersReceivedRequestToAddFriend) {
      fetchUsersReceivedRequestToAddFriend({ skip, limit }).then(({ data }) => {
        if (data?.fetchUsersReceivedRequestToAddFriend?.length) {
          const resultData = [...receivedRequestsToAddFriend, ...data.fetchUsersReceivedRequestToAddFriend]
          const uniqueResultData = _.uniqBy(resultData, "_id")
          
          setReceivedRequestsToAddFriend([...uniqueResultData]);
        }
      });
    }
  };

  if (
    !user ||
    !user?.receivedRequestToAddFriend.length ||
    !receivedRequestsToAddFriend.length
  )
    return null;
  return (
    <ContactWrapper theme={colorMode}>
      <Title theme={colorMode}>
        {i18n.store.data[lang].translation.contacts.userReceivedRequest}
      </Title>
      {receivedRequestsToAddFriend.map((item) => (
        <ContactItem key={item._id} userContact={item} type="received" />
      ))}
      {receivedRequestsToAddFriend.length <
      user.receivedRequestToAddFriend.length ? (
        <LinkReadMore>
          <span
            role="button"
            tabIndex={0}
            aria-label="button"
            onClick={getMoreUsersReceivedRequestToAddFriend}
          >
            {i18n.store.data[lang].translation.contacts.getMore}
          </span>
        </LinkReadMore>
      ) : null}
    </ContactWrapper>
  );
};

export default React.memo(SentRequestsToAddFriend);
