import React from 'react';
import { useTheme } from '../../theme';
import { ContactWrapper, Title } from './Contact.styles';
import useLocale from '../../locales';
import ContactItem from './ContactItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FETCH_USER_FRIENDS_DATA } from '../../apollo/contact/contact.types';
import { pushFriendsListToContact } from '../../apollo/contact/contact.caches';
import { useQuery } from '@apollo/client';
import constant from '../../constant/constant';
import _ from 'lodash';
const SentRequestsToAddFriend = ({ user, friends }) => {
  const { theme } = useTheme();
  const { translation } = useLocale();
  const { refetch: fetchUserFriends } = useQuery(FETCH_USER_FRIENDS_DATA, {
    skip: true,
  });
  const onFetchMoreFriends = () => {
    const skip = friends.length;
    const limit = constant.REACT_APP_USERS_CONTACT_PER_LOAD;

    let existedFriendsId = [];
    friends.forEach((friend) => existedFriendsId.push(friend._id));
    fetchUserFriends({ skip, limit, except: existedFriendsId }).then(
      ({ data }) => {
        if (data) {
          pushFriendsListToContact(data.fetchFriends);
        }
      }
    );
  };

  return (
    <ContactWrapper theme={theme}>
      <Title theme={theme}>{translation.contacts.friendsList}</Title>
      <InfiniteScroll
        dataLength={friends.length}
        next={onFetchMoreFriends}
        hasMore={friends.length < user.friends.length}
        loader={<h4>{translation.utility.loading}</h4>}
      >
        {friends.map((item) => (
          <ContactItem
            key={item._id}
            user={user}
            userContact={item}
            type="friends"
          />
        ))}
      </InfiniteScroll>
    </ContactWrapper>
  );
};

export default SentRequestsToAddFriend;
