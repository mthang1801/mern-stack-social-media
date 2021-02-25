import React , {useEffect} from "react";
import {
  GET_CURRENT_USER,
  GET_SENT_REQUESTS_TO_ADD_FRIEND,
} from "../../apollo/operations/queries/cache";
import { FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND } from "../../apollo/operations/queries/user";
import { useQuery } from "@apollo/client";
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { ContactWrapper, Title, LinkReadMore } from "./Contact.styles";
import useLanguage from "../Global/useLanguage";
import ContactItem from "./ContactItem";
const SentRequestsToAddFriend = () => {
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { sentRequestsToAddFriend },
  } = useQuery(GET_SENT_REQUESTS_TO_ADD_FRIEND, { fetchPolicy: "cache-first", pollInterval : 500 });
  const {
    refetch: fetchUsersSentRequestsToAddFriend,
  } = useQuery(FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const { setSentRequestsToAddFriend } = cacheMutations;
  const getMoreUsersSentRequestToAddFriend = () => {
    const skip = sentRequestsToAddFriend.length;
    const limit = +process.env.REACT_APP_CONTACT_USER_PER_PAGE;
    if (fetchUsersSentRequestsToAddFriend) {
      fetchUsersSentRequestsToAddFriend({ skip, limit }).then(({ data }) => {
        if (data?.fetchUsersSentRequestToAddFriend?.length) {
          console.log(data);
          setSentRequestsToAddFriend([
            ...sentRequestsToAddFriend,
            ...data.fetchUsersSentRequestToAddFriend,
          ]);
        }
      });
    }
  };
    
  if (!user || !sentRequestsToAddFriend.length) return null;
  return (
    <ContactWrapper theme={colorMode}>
      <Title theme={colorMode}>
        {i18n.store.data[lang].translation.contacts.userSentRequest}
      </Title>
      {sentRequestsToAddFriend.map((item) => (
        <ContactItem key={item._id} data={item} type="sent" />
      ))}
      {sentRequestsToAddFriend.length < user.sentRequestToAddFriend.length ? (
        <LinkReadMore>
          <span
            role="button"
            tabIndex={0}
            aria-label="button"
            onClick={getMoreUsersSentRequestToAddFriend}
          >
            {i18n.store.data[lang].translation.contacts.getMore}
          </span>
        </LinkReadMore>
      ) : null}
    </ContactWrapper>
  );
};

export default SentRequestsToAddFriend;
