import React from 'react';
import { CardWrapper } from './styles/CardRequestAuth.styles';
import ButtonLogin from '../Controls/ButtonLogin';
import ButtonSignUp from '../Controls/ButtonSignUp';
import { useTheme } from '../../theme';
import { useLocation } from 'react-router-dom';
const CardRequestAuth = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  return (
    <CardWrapper theme={theme}>
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

export default CardRequestAuth;
