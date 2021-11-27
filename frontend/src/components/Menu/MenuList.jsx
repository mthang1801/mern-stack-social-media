import React from 'react';
import { Wrapper } from './styles/MenuList.styles';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme';
import { useReactiveVar } from '@apollo/client';
import { countNumberOfNotificationUnseenVar } from '../../apollo/cache';
const MobileMenuList = ({ aside, title, list }) => {
  const { theme } = useTheme();
  const countNumberNotificationsUnseen = useReactiveVar(
    countNumberOfNotificationUnseenVar
  );
  if (!list || !list.length || !title) return null;
  return (
    <Wrapper aside={!!aside} theme={theme}>
      <h5 className="menu-title">{title}</h5>
      <ul>
        {list.map((item) => (
          <li key={item.name}>
            <Link to={item.path} className={'link-item'}>
              <div className="link-item__left">
                <span className="link-icon">{item.icon()}</span>
                <span className="link-name">{item.name}</span>
              </div>
              <div className="link-item__right">
                {countNumberNotificationsUnseen > 0 &&
                  item.name === 'Notifications' && (
                    <span>{countNumberNotificationsUnseen}</span>
                  )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default MobileMenuList;
