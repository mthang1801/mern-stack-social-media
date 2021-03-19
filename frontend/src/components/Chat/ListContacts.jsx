import React, { useState, useEffect } from "react";
import { HeadingCharacter, Wrapper } from "./styles/ListContacts.styles";
import ContactItem from "./ContactItem";
import { usePopupContactActions } from "./hook/usePopupActions";
import { useQuery } from "@apollo/client";
import { FETCH_FRIENDS } from "../../apollo/operations/queries/user/fetchFriends";
import { cacheMutations } from "../../apollo/operations/mutations/cache";
import LazyLoad from "react-lazyload";
const ListContacts = ({ data }) => {
  const { setShowPopup } = usePopupContactActions();
  const [loadContactMore, setLoadContactMore] = useState(false);
  const { refetch: fetchMoreContacts } = useQuery(FETCH_FRIENDS, {
    skip: true,
    fetchPolicy: "cache-and-network",
  });
  const { setFriends } = cacheMutations;
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
      const limit = +process.env.REACT_APP_FRIENDS_PER_LOAD;
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
        <LazyLoad key={`contact-${friend._id}`}>
          <ContactItem friend={friend} />
        </LazyLoad>
      ))}
    </Wrapper>
  );
};

export default React.memo(ListContacts);
