import React, { useEffect } from 'react';
import { FETCH_SENT_REQUEST_TO_ADD_FRIEND } from '../../apollo/contact/contact.types';
import { useQuery } from '@apollo/client';
import { useTheme } from '../../theme';
import { fetchMoreSentRequestsToAddFriend } from '../../apollo/contact/contact.caches';
import { ContactWrapper, Title, LinkReadMore } from './Contact.styles';
import useLocale from '../../locales';
import ContactItem from './ContactItem';
import constant from '../../constant/constant';
const SentRequestsToAddFriend = ({ user, sentRequestsToAddFriend }) => {
  const { refetch: fetchUsersSentRequestsToAddFriend } = useQuery(
    FETCH_SENT_REQUEST_TO_ADD_FRIEND,
    {
      fetchPolicy: 'cache-and-network',
      skip: true,
    }
  );
  const { theme } = useTheme();
  const { translation } = useLocale();

  const getMoreSentRequestToAddFriend = () => {
    const skip = sentRequestsToAddFriend.length;
    const limit = constant.REACT_APP_USERS_CONTACT_PER_LOAD;
    if (fetchUsersSentRequestsToAddFriend) {
      fetchUsersSentRequestsToAddFriend({ skip, limit }).then(({ data }) => {
        if (data?.fetchSentRequestToAddFriend?.length) {
          fetchMoreSentRequestsToAddFriend(data.fetchSentRequestToAddFriend);
        }
      });
    }
  };

  return (
    <ContactWrapper theme={theme}>
      <Title theme={theme}>{translation.contacts.userSentRequest}</Title>
      {sentRequestsToAddFriend.map((item) => (
        <ContactItem key={item._id} userContact={item} type="sent" />
      ))}
      {sentRequestsToAddFriend.length < user.sentRequestToAddFriend.length ? (
        <LinkReadMore>
          <span
            role="button"
            tabIndex={0}
            aria-label="button"
            onClick={getMoreSentRequestToAddFriend}
          >
            {translation.contacts.getMore}
          </span>
        </LinkReadMore>
      ) : null}
    </ContactWrapper>
  );
};

export default React.memo(SentRequestsToAddFriend);
