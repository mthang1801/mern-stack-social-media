import React from "react";
import {
  GET_CURRENT_USER,
  GET_RECEIVED_REQUESTS_TO_ADD_FRIEND,
} from "../../apollo/operations/queries/cache";
import { FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND } from "../../apollo/operations/queries/user";
import { useQuery } from "@apollo/client";
import { useThemeUI } from "theme-ui";
import { ContactWrapper, Title, LinkReadMore } from "./Contact.styles";
import {cacheMutations} from "../../apollo/operations/mutations/cache"
import useLanguage from "../Global/useLanguage";
import ContactItem from "./ContactItem";

const SentRequestsToAddFriend = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { receivedRequestsToAddFriend },
  } = useQuery(GET_RECEIVED_REQUESTS_TO_ADD_FRIEND, {
    fetchPolicy: "cache-first",
  });
  const {
    refetch: fetchUsersReceivedRequestToAddFriend,
  } = useQuery(FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const {setReceivedRequestsToAddFriend} = cacheMutations
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();

  const getMoreUsersReceivedRequestToAddFriend = () => {
    const skip = receivedRequestsToAddFriend.length;
    const limit = +process.env.REACT_APP_CONTACT_USER_PER_PAGE;
    if (fetchUsersReceivedRequestToAddFriend) {
      fetchUsersReceivedRequestToAddFriend({ skip, limit }).then(({ data }) => {
        if (data?.fetchUsersReceivedRequestToAddFriend?.length) {          
          setReceivedRequestsToAddFriend([
            ...receivedRequestsToAddFriend,
            ...data.fetchUsersReceivedRequestToAddFriend,
          ]);
        }
      });
    }
  }
  if (!user || !receivedRequestsToAddFriend.length) return null;
  return (
    <ContactWrapper theme={colorMode}>
      <Title theme={colorMode}>
        {i18n.store.data[lang].translation.contacts.userSentRequest}
      </Title>
      {receivedRequestsToAddFriend.map((item) => (
        <ContactItem key={item._id} data={item} type="received" />
      ))}
       {receivedRequestsToAddFriend.length < user.receivedRequestToAddFriend.length ? (
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

export default SentRequestsToAddFriend;
