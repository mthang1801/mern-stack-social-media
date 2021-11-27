import React from 'react';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames';

const Search = ({ openSearch, setOpenSearch }) => {
  return (
    <SearchForm openSearch={openSearch}>
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

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light);
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray);
  border-radius: ${({ openSearch }) => (openSearch ? '20px' : '50%')};
  flex-direction: row-reverse;
  width: ${({ openSearch }) => (openSearch ? '100%' : '40px')};
  height: ${({ openSearch }) => (openSearch ? 'auto' : '40px')};

  .input-search {
    width: 100%;
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    transition: var(--mainTrainsition);
    z-index: 1;
  }
  .btn-search {
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: var(--mainTransition);
    padding: 0 0.5rem;
    &:hover {
      opacity: 0.8;
    }
  }
  @media screen and (max-width: 768px) {
    .hide {
      width: 0 !important;
      visibility: hidden !important;
      opacity: 0;
      transition: var(--mainTransition);
    }
  }
  @media screen and (min-width: 768px) {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }
`;

export default React.memo(Search);
