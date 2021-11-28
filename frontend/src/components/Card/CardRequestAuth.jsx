import React from 'react';
import { CardWrapper } from './styles/CardRequestAuth.styles';
import ButtonLogin from '../Controls/ButtonLogin';
import ButtonSignUp from '../Controls/ButtonSignUp';
import { useTheme } from '../../theme';
import { useLocation } from 'react-router-dom';
import useLocale from '../../locales';
const CardRequestAuth = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const {
    translation: { auth },
  } = useLocale();
  return (
    <CardWrapper theme={theme}>
      <h4>{auth.requestAuth}</h4>
      <div className="buttons-container">
        <ButtonLogin to="/auth" from={pathname}>
          {auth.buttons.login}
        </ButtonLogin>
        <ButtonSignUp to="/auth/signup" from={pathname}>
          {auth.buttons.signup}
        </ButtonSignUp>
      </div>
    </CardWrapper>
  );
};

export default CardRequestAuth;
