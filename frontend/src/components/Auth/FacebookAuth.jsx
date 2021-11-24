import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { TiSocialFacebook } from 'react-icons/ti';
import styled from 'styled-components';
import useLanguage from '../Global/useLanguage';
const FBAuth = ({ loginFacebook }) => {
  const [loginName, setLoginName] = useState('');
  const { lang, i18n } = useLanguage();
  useEffect(() => {
    setLoginName(i18n.store.data[lang].translation.auth.login);
  }, [lang, i18n.store.data]);
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
        textButton={loginName}
      />
    </Wrapper>
  );
};
// const mapDispatchToProps = dispatch => ({
//   loginFacebook : (id, name, email)  => dispatch(loginFacebookStart(id, name,email))
// })
const Wrapper = styled.div`
  .btn-fb {
    font-size: 14px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    width: 100%;
    outline: none;
    border: none;
    background-color: #3b5998;
    padding: 0.75rem;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    justify-content: center;
    border-radius: 5px;
    box-shadow: var(--lightShadow);
  }

  .btn-fb:hover {
    background-color: #243c6e;
  }

  .btn-fb > svg {
    font-size: 1.5em;
    vertical-align: middle;
  }
`;
export default FBAuth;
