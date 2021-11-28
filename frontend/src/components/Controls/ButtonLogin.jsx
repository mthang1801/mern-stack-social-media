import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const ButtonLogin = ({ children, to, from, ...props }) => {
  return (
    <Button to={{ pathname: to, state: { from } }} {...props}>
      {children}
    </Button>
  );
};

const Button = styled(Link)`
  border-radius: 1.5rem;
  padding: 0.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: var(--mainTransition);
  text-transform: uppercase;
  font-weight: bolder;
  border: 1px solid var(--blue-1);
  color: var(--blue-1);
  max-width: 10rem;
  &:hover {
    color: var(--light-gray-1);
    background-color: var(--blue-1);
  }

  font-family: var(--fontFamily);
`;

export default ButtonLogin;
