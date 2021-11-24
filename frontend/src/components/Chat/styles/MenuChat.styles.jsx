import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const LinkItem = styled(NavLink)`
  font-size: 1.3rem;
  width: 100%;
  padding: 1rem;
  display: block;
  text-align: center;
  color: white;
  &:hover {
    color: var(--white);
    background-color: #29b6f6;
    opacity: 1;
  }
`;
