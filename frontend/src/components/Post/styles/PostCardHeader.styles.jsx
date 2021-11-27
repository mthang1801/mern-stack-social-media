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

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Small = styled.small`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 0.4rem;
  }
  & span {
    display: flex;
  }
`;
