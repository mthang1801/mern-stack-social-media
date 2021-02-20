import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_PERSONAL_USER } from "../../apollo/operations/queries";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Container,
  UserName,
  PersonalHeadingBackground,
  BackgroundImageContainer,
  ProfileMenus,
  ProfileMenuItemLink,
} from "./PersonalHeading.styles";
import BackgroundImage from "../../assets/images/background-wallpaper.jpg";
import useLanguage from "../Global/useLanguage";
import { useThemeUI } from "theme-ui";
const PersonalHeading = () => {
  const {
    data: { currentPersonalUser : user },
  } = useQuery(GET_CURRENT_PERSONAL_USER);
  const { colorMode } = useThemeUI();
  const { i18n, lang } = useLanguage();
  const [menus, setMenus] = useState([]);
  const [activeLink, setActiveLink] = useState(user && `/${user.slug}/posts`);
  useEffect(() => {
    setMenus(i18n.store.data[lang].translation.profileMenus);
  }, [lang]);

  if (!user) return null;
  return (
    <Container theme={colorMode}>
      <PersonalHeadingBackground theme={colorMode} background={BackgroundImage}>
        <BackgroundImageContainer theme={colorMode}>
          <LazyLoadImage src={user.avatar} alt={user.avatar} />
          <UserName>
            <h4>{user.name}</h4>
            <span>@{user.slug}</span>
          </UserName>
        </BackgroundImageContainer>
      </PersonalHeadingBackground>
      <ProfileMenus>
        {menus.length
          ? menus.map((menu) => (
              <ProfileMenuItemLink
                to={menu.path(user.slug)}
                theme={colorMode}
                active={(activeLink === menu.path(user.slug)).toString()}
                onClick={() => setActiveLink(menu.path(user.slug))}
              >
                {menu.name}
              </ProfileMenuItemLink>
            ))
          : null}
      </ProfileMenus>
    </Container>
  );
};

export default PersonalHeading;
