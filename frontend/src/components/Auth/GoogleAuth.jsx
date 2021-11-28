import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import useLocale from '../../locales';
import { LOGIN_WITH_GOOGLE } from '../../apollo/user/user.types';
import { useQuery } from '@apollo/client';
import { login } from './Auth.utility';
const GGAuth = () => {
  const { refetch: fetchLoginWithGoogle } = useQuery(LOGIN_WITH_GOOGLE, {
    skip: true,
    fetchPolicy: 'network-only',
  });
  const { translation } = useLocale();

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
      buttonText={translation.auth.login}
      prompt="select_account"
    />
  );
};

export default GGAuth;
