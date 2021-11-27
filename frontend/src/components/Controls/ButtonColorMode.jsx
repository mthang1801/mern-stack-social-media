import React from 'react';
import { useTheme } from '../../theme';
import Switch from 'react-switch';
import sun from '../../assets/images/sun.png';
import moon from '../../assets/images/moon.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const iconCss = [{ pointerEvents: `none`, margin: 4 }];

const checkedIcon = (
  <LazyLoadImage
    effect="blur"
    alt="moon indicating dark mode"
    src={moon}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
);

const uncheckedIcon = (
  <LazyLoadImage
    effect="blur"
    alt="sun indicating light mode"
    src={sun}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
);

const ButtonColorMode = () => {
  const { setColorMode, theme } = useTheme();
  return (
    <Switch
      arial-label="Toggle dark mode"
      checkedIcon={checkedIcon}
      uncheckedIcon={uncheckedIcon}
      checked={theme.name === 'light'}
      onChange={() => setColorMode(theme.name === 'light' ? 'dark' : 'light')}
      height={24}
      width={48}
      handleDiameter={24}
      onHandleColor={'#1e88e5'}
      offHandleColor={'#ffd600'}
      offColor="#3949ab"
      onColor="#6200ea"
      boxShadow="inset 0 0 0 1px #000"
    />
  );
};

export default ButtonColorMode;
