import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid
    ${({ theme }) => (theme ? theme.border : 'var(--border)')};
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
  border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
  border-radius: 1rem;
  padding: 0.15rem 0.35rem;
  background-color: ${({ status }) =>
    status === 'PUBLIC'
      ? 'var(--indigo-1)'
      : status === 'FRIENDS'
      ? 'var(--green-1)'
      : 'var(--light-gray-1)'};
  color: ${({ status }) =>
    status === 'PUBLIC' || status === 'FRIENDS'
      ? 'var(--white)'
      : 'var(--black)'};
  &:hover {
    background-color: ${({ status }) =>
      status === 'PUBLIC'
        ? 'var(--indigo-2)'
        : status === 'FRIENDS'
        ? 'var(--green-2)'
        : 'var(--light-gray-2)'};
  }
`;

export const DropdownStatus = styled.div`
  position: absolute;
  top: 110%;
  left: 5%;
  width: 130px;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme ? theme.card.primary : 'var(--card-primary)'};

  border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
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
      margin-right: 0.5rem;
    }
  }
  &:hover {
    background-color: ${({ theme }) =>
      theme ? theme.hover.background : 'var(--hover-background)'};
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
