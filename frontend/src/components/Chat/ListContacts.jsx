import React, { useState, useEffect } from 'react';
import { Wrapper } from './styles/ListContacts.styles';
import ContactItem from './ContactItem';
import { usePopupContactActions } from './hook/usePopupActions';
import { useQuery } from '@apollo/client';
import { FETCH_USER_FRIENDS_DATA } from '../../apollo/contact/contact.types';
import { setFriends } from '../../apollo/user/user.caches';
import constant from '../../constant/constant';
const ListContacts = ({ data }) => {
  const { setShowPopup } = usePopupContactActions();
  const [loadContactMore, setLoadContactMore] = useState(false);
  const { refetch: fetchMoreContacts } = useQuery(FETCH_USER_FRIENDS_DATA, {
    skip: true,
    fetchPolicy: 'cache-and-network',
  });
  const onScrollListContacts = (e) => {
    e.preventDefault();
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    if (clientHeight + scrollTop > scrollHeight * 0.75) {
      setLoadContactMore(true);
    }
  };

  useEffect(() => {
    if (loadContactMore) {
      const skip = data.length;
      const limit = constant.REACT_APP_FRIENDS_PER_LOAD;
      fetchMoreContacts({ skip, limit }).then(({ data: { fetchFriends } }) => {
        setFriends([...data, ...fetchFriends]);
        setLoadContactMore(false);
      });
    }
  }, [loadContactMore]);
  if (!data.length) return null;
  return (
    <Wrapper
      onScroll={() => setShowPopup(false)}
      onScrollCapture={onScrollListContacts}
    >
      {data.map((friend) => (
        <ContactItem key={`contact-${friend._id}`} friend={friend} />
      ))}
    </Wrapper>
  );
};

export default React.memo(ListContacts);
