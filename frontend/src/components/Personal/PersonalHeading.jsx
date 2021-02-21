import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_PERSONAL_USER
} from "../../apollo/operations/queries";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Container,
  UserName,
  PersonalHeadingBackground,
  BackgroundImageContainer,
  PersonalMenus,
  ProfileMenuItemLink,
  Footer
} from "./PersonalHeading.styles";
import BackgroundImage from "../../assets/images/background-wallpaper.jpg";
import useLanguage from "../Global/useLanguage";
import { useThemeUI } from "theme-ui";
import PersonalHeadingContact from "./PersonalHeadingContact"

const PersonalHeading = () => {
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER);

  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const [menus, setMenus] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  
  
  useEffect(() => {
    setMenus(i18n.store.data[lang].translation.personalMenus);
  }, [lang]);

  useEffect(() => {
    if (currentPersonalUser) {
      setActiveLink(`/${currentPersonalUser.slug}/posts`);
    }
  }, [currentPersonalUser]);

  if (!currentPersonalUser) return null;
  return (
    <Container theme={colorMode}>
      <PersonalHeadingBackground theme={colorMode} background={BackgroundImage}>
        <BackgroundImageContainer theme={colorMode}>
          <LazyLoadImage
            src={currentPersonalUser.avatar}
            alt={currentPersonalUser.avatar}
          />
          <UserName>
            <h4>{currentPersonalUser.name}</h4>
            <span>@{currentPersonalUser.slug}</span>
          </UserName>
        </BackgroundImageContainer>
      </PersonalHeadingBackground>
      <Footer>
        <PersonalMenus>
          {menus.length
            ? menus.map((menu) => (
                <ProfileMenuItemLink
                  to={menu.path(currentPersonalUser.slug)}
                  theme={colorMode}
                  active={(
                    activeLink === menu.path(currentPersonalUser.slug)
                  ).toString()}
                  onClick={() =>
                    setActiveLink(menu.path(currentPersonalUser.slug))
                  }
                >
                  {menu.name}
                </ProfileMenuItemLink>
              ))
            : null}
        </PersonalMenus>
        <PersonalHeadingContact/>
      </Footer>
    </Container>
  );
};

export default PersonalHeading;
