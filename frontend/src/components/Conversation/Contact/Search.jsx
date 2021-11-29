import React from 'react';
import { SearchForm } from './styles/Search.styles';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../../theme';
const Search = ({ friendContact, setFriendContact, ...props }) => {
  const { theme } = useTheme();
  const onSearchChange = (e) => {
    if (!e.target.value) {
      return setFriendContact(friendContact);
    }
    const friendFilter = friendContact.filter((friend) =>
      friend.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFriendContact(friendFilter);
  };
  return (
    <SearchForm theme={theme}>
      <input type="text" placeholder="Search..." onChange={onSearchChange} />
      <button type="button">
        <FaSearch />
      </button>
    </SearchForm>
  );
};

export default Search;
