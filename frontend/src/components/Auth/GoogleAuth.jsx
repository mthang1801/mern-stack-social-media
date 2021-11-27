import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import useLanguage from '../Global/useLanguage';
import { LOGIN_WITH_GOOGLE } from '../../apollo/user/user.types';
import { useQuery } from '@apollo/client';
import { login } from './Auth.utility';
const GGAuth = () => {
  const [loginName, setLoginName] = useState('');
  const { refetch: fetchLoginWithGoogle } = useQuery(LOGIN_WITH_GOOGLE, {
    skip: true,
    fetchPolicy: 'network-only',
  });
  const { i18n, lang } = useLanguage();
  useEffect(() => {
    setLoginName(i18n.store.data[lang].translation.auth.login);
  }, [lang, i18n.store.data, setLoginName]);
  const responseGoogle = (response) => {
    let { name, email, googleId, imageUrl } = response.profileObj;
    if (!name) {
      name =
        `${response.profileObj.givenName} ${response.profileObj.familyName}` ||
        'Người dùng mới';
    }

    fetchLoginWithGoogle({ name, email, googleId, imageUrl }).then(
      ({ data }) => {
        if (data?.loginUserWithGoogle) {
          const { token, user, tokenExpire } = data.loginUserWithGoogle;
          login(user, token, tokenExpire);
        }
      }
    );
  };
  return (
    <GoogleLogin
      clientId="660605287272-bcknbfn9c01uuf8rimiefiblh5587gij.apps.googleusercontent.com"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      buttonText={loginName}
      prompt="select_account"
    />
  );
};

export default GGAuth;
