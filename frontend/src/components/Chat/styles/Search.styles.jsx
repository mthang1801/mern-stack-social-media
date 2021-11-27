import styled from 'styled-components/macro';

export const SearchForm = styled.form`
  position: relative;
  width: 90%;
  height: 2rem;
  margin: 1.1rem auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-card-dark)' : 'var(--color-card-default)'};
  color: inherit;
  border-radius: 1rem;
  overflow: hidden;
  & > input {
    padding: 0.25rem;
    font-size: 1rem;
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
  }
  & > button {
    border: none;
    outline: none;
    background-color: transparent;
    width: 1.6rem;
    height: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
