import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { userVar, currentPersonalUserVar } from '../../apollo/cache';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  Container,
  UserName,
  PersonalHeadingBackground,
  BackgroundImageContainer,
  PersonalMenus,
  ProfileMenuItemLink,
  Footer,
} from './styles/PersonalHeading.styles';
import BackgroundImage from '../../assets/images/background-wallpaper.jpg';
import useLocale from '../../locales';
import { useTheme } from '../../theme';
import PersonalHeadingContact from './PersonalHeadingContact';

const PersonalHeading = () => {
  const user = useReactiveVar(userVar);
  const currentPersonalUser = useReactiveVar(currentPersonalUserVar);
  const { theme } = useTheme();
  const { translation } = useLocale();
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    if (currentPersonalUser) {
      setActiveLink(`/${currentPersonalUser.slug}/posts`);
    }
  }, [currentPersonalUser]);

  if (!currentPersonalUser) return null;
  return (
    <Container theme={theme}>
      <PersonalHeadingBackground theme={theme} background={BackgroundImage}>
        <BackgroundImageContainer theme={theme}>
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
          {translation.personalMenus.length
            ? translation.personalMenus.map((menu) => (
                <ProfileMenuItemLink
                  key={menu.name}
                  to={menu.path(currentPersonalUser.slug)}
                  theme={theme}
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
        {user && <PersonalHeadingContact user={user} />}
      </Footer>
    </Container>
  );
};

export default React.memo(PersonalHeading);
