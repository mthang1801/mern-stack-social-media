import React, { useEffect } from 'react';
import { FETCH_RECEIVED_REQUESTS_TO_ADD_FRIEND } from '../../apollo/contact/contact.types';
import { useQuery } from '@apollo/client';
import { useThemeUI } from 'theme-ui';
import { ContactWrapper, Title, LinkReadMore } from './Contact.styles';
import { fetchMoreReceivedRequestsToAddFriend } from '../../apollo/contact/contact.caches';
import useLanguage from '../Global/useLanguage';
import ContactItem from './ContactItem';
import _ from 'lodash';
import constant from '../../constant/constant';
const ReceivedRequestsToAddFriend = ({ user, receivedRequestsToAddFriend }) => {
  const { refetch: fetchReceivedRequestToAddFriend } = useQuery(
    FETCH_RECEIVED_REQUESTS_TO_ADD_FRIEND,
    {
      fetchPolicy: 'cache-and-network',
      skip: true,
    }
  );
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();

  const getMoreReceivedRequestToAddFriend = () => {
    const skip = receivedRequestsToAddFriend.length;
    const limit = constant.REACT_APP_CONTACT_USER_PER_PAGE;
    if (fetchReceivedRequestToAddFriend) {
      fetchReceivedRequestToAddFriend({ skip, limit }).then(({ data }) => {
        if (data?.fetchReceivedRequestToAddFriend?.length) {
          fetchMoreReceivedRequestsToAddFriend(
            data.fetchReceivedRequestToAddFriend
          );
        }
      });
    }
  };
  return (
    <ContactWrapper theme={colorMode}>
      <Title theme={colorMode}>
        {i18n.store.data[lang].translation.contacts.userReceivedRequest}
      </Title>
      {receivedRequestsToAddFriend.map((item) => (
        <ContactItem
          key={item._id}
          user={user}
          userContact={item}
          type="received"
        />
      ))}
      {receivedRequestsToAddFriend.length <
      user.receivedRequestToAddFriend.length ? (
        <LinkReadMore>
          <span
            role="button"
            tabIndex={0}
            aria-label="button"
            onClick={getMoreReceivedRequestToAddFriend}
          >
            {i18n.store.data[lang].translation.contacts.getMore}
          </span>
        </LinkReadMore>
      ) : null}
    </ContactWrapper>
  );
};

export default React.memo(ReceivedRequestsToAddFriend);
