import React  from "react";
import {
  GET_SENT_REQUESTS_TO_ADD_FRIEND,
} from "../../apollo/operations/queries/cache";
import { FETCH_USERS_SENT_REQUEST_TO_ADD_FRIEND } from "../../apollo/user/user.types";
import { useQuery, useReactiveVar } from "@apollo/client";
import {userVar} from "../../apollo/cache"
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import { ContactWrapper, Title, LinkReadMore } from "./Contact.styles";
import useLanguage from "../Global/useLanguage";
import ContactItem from "./ContactItem";
const SentRequestsToAddFriend = () => {
  const user = useReactiveVar(userVar);
  const {
    data: { sentRequestsToAddFriend },
  } = useQuery(GET_SENT_REQUESTS_TO_ADD_FRIEND, { fetchPolicy: "cache-first" });
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
          setSentRequestsToAddFriend([
            ...sentRequestsToAddFriend,
            ...data.fetchUsersSentRequestToAddFriend,
          ]);
        }
      });
    }
  };
 
  if (!user || !user?.sentRequestToAddFriend.length || !sentRequestsToAddFriend.length) return null;
  return (
    <ContactWrapper theme={colorMode}>
      <Title theme={colorMode}>
        {i18n.store.data[lang].translation.contacts.userSentRequest}
      </Title>
      {sentRequestsToAddFriend.map((item) => (
        <ContactItem key={item._id} userContact={item} type="sent" />
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

export default React.memo(SentRequestsToAddFriend);
