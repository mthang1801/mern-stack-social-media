import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostToolbarHeader from "./PostToolbarHeader";
import useLanguage from "../Global/useLanguage";
import Button from "../Controls/ButtonPost";
import {useThemeUI} from "theme-ui"
const PostToolbar = () => {
  const { i18n, lang } = useLanguage();
  const [mindText, setMindText] = useState("");
  const [statusFooter, setStatusFooter] = useState([]);
  const {colorMode} = useThemeUI();
  useEffect(() => {
    setMindText(i18n.store.data[lang].translation.mindText);
    setStatusFooter(i18n.store.data[lang].translation.statusFooter);
  }, [i18n.store.data, lang]);
  return (
    <PostBox theme={colorMode}>
      <div className="heading">
        <PostToolbarHeader />
      </div>

      <div className="body">
        <textarea placeholder={mindText} className="mind-text"></textarea>
      </div>
      <div className="footer">
        {statusFooter.map((item) => (
          <Button key={item.name} color={item.color}>
            {item.icon()}
          </Button>
        ))}
      </div>
    </PostBox>
  );
};

const PostBox = styled.section`
  width: 95%;
  margin: auto;
  background-color: ${({theme}) => theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
  border-radius: 8px;
  box-shadow: var(--lightShadow);
  .heading,
  .body {
    padding: 0.5rem;
    border-bottom: 1px solid var(--gray-deep);
  }
  .footer {
    display: flex;
    padding: 0.5rem;
  }

  .mind-text {
    width: 100%;
    height: 3.5rem;
    background-color: ${({theme}) => theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
    color : inherit ;
    outline: none;
    border: none;
    padding: 0.5rem;
    resize: none;
    font-family: var(--fontFamily);
    font-size: 1rem;
  }
`;

export default PostToolbar;
