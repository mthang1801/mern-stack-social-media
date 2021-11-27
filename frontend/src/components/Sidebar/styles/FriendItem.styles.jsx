import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const LinkItem = styled(Link)`
  display: flex;
  padding: 0.3rem 1.5rem;
  align-items: center;
  justify-content: space-between;
  &:hover {
    opacity: 1;
    background-color: ${({ theme }) =>
      theme ? theme.background : 'var(--background)'};
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  & img {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => (theme ? theme.border : 'var(--border)')};
  }
  ${({ active }) =>
    active &&
    `
  & img {
    border: 2px solid var(--green-1);
  }
  &::after{
    position: absolute;
    content: ""; /* this is important */
    height: 0.5rem;
    width: 0.5rem;
    border-radius : 50%;
    background-color : var(--green-1);
    right: 20%;
    top: 60%;
    z-index: 1001;
  }
`}
`;

export const ActiveStatus = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: green;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
