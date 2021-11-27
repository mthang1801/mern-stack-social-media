import React from 'react';
import Header from '../components/Header/Header';
import MenuList from '../components/Menu/MenuList';
import { Wrapper } from './styles/Layout.styles';
import classNames from 'classnames';
import { toggleMenuVar } from '../apollo/cache';
import useMenuList from '../components/Menu/useMenuList';
import { useTheme } from '../theme';
import AlertDialogSlide from '../components/UI/AlertDialogSlide';
import LazyLoad from 'react-lazyload';
import { useReactiveVar } from '@apollo/client';

const Layout = ({ children, ...props }) => {
  const { menu, explores } = useMenuList();
  const toggleMenu = useReactiveVar(toggleMenuVar);
  const { theme } = useTheme();
  return (
    <Wrapper theme={theme} {...props}>
      <AlertDialogSlide />
      <Header />
      <div
        className={classNames('small-viewport-menu-list', {
          'hide-small-viewport-list': toggleMenu,
        })}
      >
        <MenuList list={menu} title="Menu" />
        <MenuList list={explores} title="Explores" />
      </div>

      <div className="body">
        <LazyLoad>{children}</LazyLoad>
      </div>
    </Wrapper>
  );
};

export default Layout;
