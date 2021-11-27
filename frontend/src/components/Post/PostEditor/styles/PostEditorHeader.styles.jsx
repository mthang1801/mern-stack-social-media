import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-border-dark)'
        : 'var(--color-border-default)'};
`;

export const Information = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  & img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  & > *:not(last-child) {
    margin-left: 0.5rem;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectStatus = styled.div`
  position: relative;
  font-size: 0.75rem;
  z-index: 1;
`;

export const Selected = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  & span {
    display: flex;
    margin: 0 0.2rem;
  }
  border: 1px solid
    ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-border-dark)'
        : 'var(--color-border-default)'};
  border-radius: 1rem;
  padding: 0.15rem 0.35rem;
  background-color: ${({ status }) =>
    status === 'public'
      ? 'var(--indigo-1)'
      : status === 'friends'
      ? 'var(--green-1)'
      : 'var(--gray-light-1)'};
  color: ${({ status }) =>
    status === 'public' || status === 'friends'
      ? 'var(--white)'
      : 'var(--black)'};
  &:hover {
    background-color: ${({ status }) =>
      status === 'public'
        ? 'var(--indigo-2)'
        : status === 'friends'
        ? 'var(--green-2)'
        : 'var(--gray-light-2)'};
  }
`;

export const DropdownStatus = styled.div`
  position: absolute;
  top: 110%;
  left: 5%;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'var(--color-card-dark)' : 'var(--color-card-default)'};
  border: 1px solid
    ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-border-dark)'
        : 'var(--color-border-default)'};
  border-radius: 0.3rem;
  box-shadow: var(--lightShadow);
  overflow: hidden;
  ${({ open }) =>
    open
      ? `
    display : flex;
  `
      : `
    display : none;
  `}
`;

export const StatusItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  text-transform: capitalize;
  cursor: pointer;
  padding: 0.4rem 0.5rem;
  & span {
    display: flex;
    &:not(last-child) {
      margin-right: 0.2rem;
    }
  }
  &:hover {
    background-color: ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-hover-dark)'
        : 'var(--color-hover-default)'};
  }
`;

export const ButtonZoom = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.4rem;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;
