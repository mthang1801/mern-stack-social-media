import React, { useEffect } from "react";
import { GET_NOTIFICATIONS_CACHE_DATA } from "../../apollo/operations/queries/cache";
import {
  FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND,
  FETCH_CURRENT_USER,
} from "../../apollo/operations/queries/user";
import { useQuery } from "@apollo/client";
import { useThemeUI } from "theme-ui";
import { ContactWrapper, Title, LinkReadMore } from "./Contact.styles";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import useLanguage from "../Global/useLanguage";
import ContactItem from "./ContactItem";
import subscriptions from "../../apollo/operations/subscriptions";
import _ from "lodash";
const SentRequestsToAddFriend = () => {
  const {
    data: { user, receivedRequestsToAddFriend },
  } = useQuery(GET_NOTIFICATIONS_CACHE_DATA, {
    fetchPolicy: "cache-first",
  });
  const { refetch: fetchUsersReceivedRequestToAddFriend } = useQuery(
    FETCH_USERS_RECEIVED_REQUESTS_TO_ADD_FRIEND,
    {
      fetchPolicy: "cache-and-network",
      skip: true,
    }
  );

  const { setReceivedRequestsToAddFriend } = cacheMutations;
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const {
    refetch: fetchCurrentUser,
    subscribeToMore: subscribeUser,
  } = useQuery(FETCH_CURRENT_USER, { skip: true });

  useEffect(() => {
    fetchCurrentUser();
    return () => fetchCurrentUser();
  }, [fetchCurrentUser]);
  //subscribe user
  useEffect(() => {
    let unsubscribeUser;

    if (subscribeUser && user) {
      unsubscribeUser = subscribeUser({
        document:
          subscriptions.userSubscription
            .CANCEL_REQUEST_TO_ADD_FRIEND_SUBSCRIPTION,
        variables: { userId: user._id },
        updateQuery: (_, { subscriptionData }) => {
          const {
            sender,
            receiver,
          } = subscriptionData.data.cancelRequestToAddFriendSubscription;
          console.log(sender);
          const filterSenders = receivedRequestsToAddFriend.filter(
            (senderRequest) => senderRequest._id !== sender._id
          );
          setReceivedRequestsToAddFriend([...filterSenders]);
        },
      });
      return () => {
        if (unsubscribeUser) {
          unsubscribeUser();
        }
      };
    }
  }, [subscribeUser, user, receivedRequestsToAddFriend]);


  const getMoreUsersReceivedRequestToAddFriend = () => {
    const skip = receivedRequestsToAddFriend.length;
    const limit = +process.env.REACT_APP_CONTACT_USER_PER_PAGE;
    if (fetchUsersReceivedRequestToAddFriend) {
      fetchUsersReceivedRequestToAddFriend({ skip, limit }).then(({ data }) => {
        if (data?.fetchUsersReceivedRequestToAddFriend?.length) {
          const resultData = [
            ...receivedRequestsToAddFriend,
            ...data.fetchUsersReceivedRequestToAddFriend,
          ];
          const uniqueResultData = _.uniqBy(resultData, "_id");

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
