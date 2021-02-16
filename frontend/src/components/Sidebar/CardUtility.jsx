import React, { useState, useEffect } from "react";
import useLanguage from "../Global/useLanguage";
import { useThemeUI } from "theme-ui";
import styled from "styled-components";
import ButtonLogin from "../Controls/ButtonLogin"
import ButtonSignUp from "../Controls/ButtonSignUp"

const CardUtility = () => {
  const [welcome, setWelcome] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [askLogin, setAskLogin] = useState("");
  const { colorMode } = useThemeUI();
  const { lang, i18n } = useLanguage();

  useEffect(() => {
    setWelcome(i18n.store.data[lang].translation.greeting.welcome);
    setIntroduce(i18n.store.data[lang].translation.greeting.introduce);
    setAskLogin(i18n.store.data[lang].translation.greeting.askLogin);
  }, [lang]);

  return <CardWrapper theme={colorMode}>
    <Welcome>{welcome}</Welcome>
    <div>{introduce}</div>   
    <div className="auth">
      <ButtonLogin to="/auth">Login</ButtonLogin>
      <ButtonSignUp to="/auth/signup">SignUp</ButtonSignUp>
    </div>
  </CardWrapper>;
};

const CardWrapper = styled.aside`
  background-color: ${({ theme }) =>
    theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-default)"};
  text-align: center;
  border-radius: 0.7rem;
  overflow: hidden;
  padding: 1.5rem;
  .auth{
    &> *{
      margin : 1rem 0;
    }
  }
`;

const Welcome = styled.h4`
  font-size : 1.1em;
  font-weight : 600;
`



export default CardUtility;
