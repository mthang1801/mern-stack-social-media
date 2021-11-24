import React from 'react';
import styled from 'styled-components';
import ButtonLogin from '../Controls/ButtonLogin';
import ButtonSignUp from '../Controls/ButtonSignUp';
import { useThemeUI } from 'theme-ui';
import { useLocation } from 'react-router-dom';
const CardRequestAuth = () => {
  const { colorMode } = useThemeUI();
  const { pathname } = useLocation();

  return (
    <CardWrapper theme={colorMode}>
      <h4>You need to login or signup to continue</h4>
      <div className="buttons-container">
        <ButtonLogin to="/auth" from={pathname}>
          Login
        </ButtonLogin>
        <ButtonSignUp to="/auth/signup" from={pathname}>
          Signup
        </ButtonSignUp>
      </div>
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  text-align: center;
  padding : 2rem;
  width : 90%;
  margin: auto;
  max-width : 400px;
  background : ${({ theme }) =>
    theme === 'dark'
      ? 'linear-gradient(to right bottom, #575757, #383535)'
      : 'linear-gradient(to right bottom, #e4eced, #dae9eb, #d5eaed)'};
  border-radius : 0.75rem;
  box-shadow : var(--mediumShadow);
  h4{
    font-size : 1.1em;
    font-weight : 500;    
  }
.buttons-container{
  display : flex;
  margin: 1rem auto;
  justify-content : space-around;
  & > *{
    width  45%;
  }  
}

`;

export default CardRequestAuth;
