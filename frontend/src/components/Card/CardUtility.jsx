import React, { useState, useEffect } from 'react';
import useLanguage from '../Global/useLanguage';
import { useTheme } from '../../theme';
import { CardWrapper } from './styles/CardUtility.styles';
import ButtonLogin from '../Controls/ButtonLogin';
import ButtonSignUp from '../Controls/ButtonSignUp';
import { useLocation } from 'react-router-dom';
const CardUtility = () => {
  const [welcome, setWelcome] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [askLogin, setAskLogin] = useState('');
  const { theme } = useTheme();
  const { lang, i18n } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    setWelcome(i18n.store.data[lang].translation.greeting.welcome);
    setIntroduce(i18n.store.data[lang].translation.greeting.introduce);
    setAskLogin(i18n.store.data[lang].translation.greeting.askLogin);
  }, [lang]);

  return (
    <CardWrapper theme={theme}>
      <h4>{welcome}</h4>
      <div>{introduce}</div>
      <div className="auth">
        <ButtonLogin to="/auth" from={pathname}>
          Login
        </ButtonLogin>
        <ButtonSignUp to="/auth/signup" from={pathname}>
          SignUp
        </ButtonSignUp>
      </div>
    </CardWrapper>
  );
};

export default CardUtility;
