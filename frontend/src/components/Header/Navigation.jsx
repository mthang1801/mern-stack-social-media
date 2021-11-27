import React, { useEffect, useState } from 'react';
import useLanguage from '../Global/useLanguage';
import { NavLink } from 'react-router-dom';
import { NavigationWrapper } from './styles/Navigation.styles';
import Tooltips from './Tooltips';
import { useTheme } from '../../theme';
const Navigation = () => {
  const { i18n, lang } = useLanguage();
  const [menu, setMenu] = useState([]);
  const [showTooltips, setshowTooltips] = useState('');
  const { theme } = useTheme();
  useEffect(() => {
    setMenu(i18n.store.data[lang].translation.navigationAuth);
  }, [lang, i18n.store.data]);
  if (!menu.length) return null;
  return (
    <NavigationWrapper theme={theme}>
      {menu.map((item) => (
        <li key={item.name} className="nav-item">
          <NavLink
            exact
            to={item.path}
            className="nav-link"
            activeClassName="nav-link-active"
            onMouseOver={() => setshowTooltips(item.name)}
            onMouseOut={() => setshowTooltips('')}
          >
            <span className="nav-icon" title={item.name}>
              {item.icon()}
            </span>
            <span className="nav-name"> {item.name}</span>
          </NavLink>
          <Tooltips showTooltips={showTooltips === item.name}>
            {item.name}
          </Tooltips>
        </li>
      ))}
    </NavigationWrapper>
  );
};

export default Navigation;
