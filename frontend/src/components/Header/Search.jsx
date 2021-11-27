import React from 'react';
import { SearchForm } from './styles/Search.styles';
import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames';
import { useTheme } from '../../theme';
const Search = ({ openSearch, setOpenSearch }) => {
  const { theme } = useTheme();
  return (
    <SearchForm theme={theme} openSearch={openSearch}>
      <input
        type="text"
        className={classNames('input-search', { hide: !openSearch })}
        placeholder="Search..."
      />
      <button
        type="button"
        className={classNames('btn-search', { hide: openSearch })}
        onClick={setOpenSearch}
      >
        <FaSearch />
      </button>
    </SearchForm>
  );
};

export default React.memo(Search);
