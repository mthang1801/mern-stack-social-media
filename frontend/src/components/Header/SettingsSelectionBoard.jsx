import React from 'react';
import { FaChevronRight, FaRegSun } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import ButonColorMode from '../Controls/ButtonColorMode';
import { Link } from 'react-router-dom';
import { userVar } from '../../apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { logout } from '../Auth/Auth.utility';
import useLocale from '../../locales';
import Button from '../Controls/ButtonDefaultCircle';
import { useTheme } from '../../theme';
import {
  ListSelection,
  SelectionItem,
  LeftItem,
  LeftItemIcon,
  LeftItemText,
  UserProfile,
  UserImageContainer,
  UserName,
  UserRedirect,
} from './styles/SettingSelecttionBoard.styles';
const SettingsSelectionBoard = ({ setOpenLocales, open }) => {
  const { theme } = useTheme();
  const {
    translation: { settingAccountDialog },
  } = useLocale();

  const user = useReactiveVar(userVar);

  const onLogout = () => {
    logout();
  };
  return (
    <ListSelection theme={theme} open={open}>
      {user ? (
        <UserRedirect>
          <UserProfile>
            <Link to={`/${user.slug}`}>
              <UserImageContainer>
                <img src={`${user.avatar}`} />
              </UserImageContainer>
            </Link>
            <Link to={`/${user.slug}`}>
              <UserName>
                <span>{user.name}</span>
                <small>{settingAccountDialog.profile}</small>
              </UserName>
            </Link>
          </UserProfile>
        </UserRedirect>
      ) : null}

      {/* Setting Color mode */}
      <SelectionItem theme={theme}>
        <LeftItem>
          <LeftItemIcon>
            <FaRegSun />
          </LeftItemIcon>
          <LeftItemText>{settingAccountDialog.appearance}</LeftItemText>
        </LeftItem>
        <div>
          <ButonColorMode />
        </div>
      </SelectionItem>
      {/* Setting Language */}
      <SelectionItem theme={theme} onClick={() => setOpenLocales(true)}>
        <LeftItem>
          <LeftItemIcon>
            <MdLanguage />
          </LeftItemIcon>
          <LeftItemText>{settingAccountDialog.language}</LeftItemText>
        </LeftItem>
        <div>
          <Button variant="outlined">
            <FaChevronRight />
          </Button>
        </div>
      </SelectionItem>
      {/* Setting Privacy */}
      <SelectionItem theme={theme}>
        <LeftItem>
          <LeftItemIcon>
            <AiOutlineSetting />
          </LeftItemIcon>
          <LeftItemText>{settingAccountDialog.settingAndPrivacy}</LeftItemText>
        </LeftItem>
        <div>
          <Button variant="outlined">
            <FaChevronRight />
          </Button>
        </div>
      </SelectionItem>
      {/* Logout User Account*/}
      {user ? (
        <SelectionItem theme={theme} onClick={onLogout}>
          <LeftItem>
            <LeftItemIcon>
              <FiLogOut />
            </LeftItemIcon>
            <LeftItemText>{settingAccountDialog.logout}</LeftItemText>
          </LeftItem>
        </SelectionItem>
      ) : null}
    </ListSelection>
  );
};

export default SettingsSelectionBoard;
