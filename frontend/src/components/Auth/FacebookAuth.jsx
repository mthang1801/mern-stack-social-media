import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { TiSocialFacebook } from 'react-icons/ti';
import { Wrapper } from './styles/FacebookAuth.styles';
import useLocale from '../../locales';
const FBAuth = ({ loginFacebook }) => {
  const { translation } = useLocale();
  const responseFacebook = (response) => {
    const { name, email, userID } = response;
    loginFacebook(userID, name, email);
  };
  return (
    <Wrapper>
      <FacebookLogin
        appId="1234252493592068"
        fields="name,email,picture"
        icon={<TiSocialFacebook />}
        callback={responseFacebook}
        cssClass="btn-fb"
        textButton={translation.auth.login}
      />
    </Wrapper>
  );
};

export default FBAuth;
