import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
const ButtonSignUp = ({ children, to, from, ...props }) => {
  return (
    <Button to={{ pathname: to, state: { from } }} {...props}>
      {children}
    </Button>
  );
};

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  padding: 0.25rem 1.5rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: var(--mainTransition);
  text-transform: uppercase;
  font-weight: bolder;
  border: 1px solid var(--success);
  color: var(--success);
  &:hover {
    color: var(--light);
    background-color: var(--success);
    box-shadow: var(--lightShadow);
  }
  font-family: var(--fontFamily);
`;

export default ButtonSignUp;
