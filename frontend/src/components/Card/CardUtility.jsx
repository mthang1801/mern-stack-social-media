import React, { useState, useEffect } from 'react';
import useLocale from '../../locales';
import { useTheme } from '../../theme';
import { CardWrapper } from './styles/CardUtility.styles';
import ButtonLogin from '../Controls/ButtonLogin';
import ButtonSignUp from '../Controls/ButtonSignUp';
import { useLocation } from 'react-router-dom';
const CardUtility = () => {
  const { theme } = useTheme();
  const { translation } = useLocale();
  const { pathname } = useLocation();

  return (
    <CardWrapper theme={theme}>
      <h4>{translation.greeting.welcome}</h4>
      <div>{translation.greeting.introduce}</div>
      <div className="auth">
        <ButtonLogin to="/auth" from={pathname}>
          {translation.auth.buttons.login}
        </ButtonLogin>
        <ButtonSignUp to="/auth/signup" from={pathname}>
          {translation.auth.buttons.signup}
        </ButtonSignUp>
      </div>
    </CardWrapper>
  );
};

export default CardUtility;
