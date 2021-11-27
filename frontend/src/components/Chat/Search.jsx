import React from 'react';
import { SearchForm } from './styles/Search.styles';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../theme';
const Search = ({ search, onChange, ...props }) => {
  const { theme } = useTheme();
  return (
    <SearchForm theme={theme}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
      />
      <button type="button">
        <FaSearch />
      </button>
    </SearchForm>
  );
};

export default Search;
