import React, { useState, useRef, useEffect } from 'react';
import { IoIosSettings } from 'react-icons/io';
import Button from '../Controls/ButtonDefaultCircle';
import { SettingWrapper } from './styles/SettingAccount.styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../theme';
import { FaChevronRight, FaRegSun } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import ButonColorMode from '../Controls/ButtonColorMode';
import { userVar } from '../../apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { logout } from '../Auth/Auth.utility';
const SettingAccount = ({ className }) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const { theme } = useTheme();
  const settingRef = useRef(false);
  const user = useReactiveVar(userVar);
  useEffect(() => {
    function handleClickOutsidePopup(e) {
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        setTogglePopup(false);
      }
    }
    window.addEventListener('click', (e) => {
      handleClickOutsidePopup(e);
    });
    return () =>
      window.removeEventListener('click', (e) => {
        handleClickOutsidePopup(e);
      });
  }, []);

  const onLogout = () => {
    logout();
  };

  return (
    <SettingWrapper className={className} ref={settingRef} theme={theme}>
      <Button onClick={() => setTogglePopup((prevStatus) => !prevStatus)}>
        <IoIosSettings />
      </Button>
      <ul
        className={classNames('popup-setting', {
          'popup-setting-hide': !togglePopup,
        })}
      >
        {user ? (
          <li className="user-profile">
            <Link to={`/${user.slug}`} className="direct-user-profile">
              <span className="user-image-container">
                <img src={`${user.avatar}`} alt="user profile" />
              </span>
              <span className="user-name" id="user-name">
                <span>{user.name}</span>
                <small>Go to your profile</small>
              </span>
            </Link>
          </li>
        ) : null}

        {/* Setting Color mode */}
        <li>
          <div className="popup-item-left">
            <span className="popup-item-left__icon">
              <FaRegSun />
            </span>
            <span className="popup-item-left__name">Apperance</span>
          </div>
          <div className="popup-item-right">
            <ButonColorMode />
          </div>
        </li>
        {/* Setting Language */}
        <li>
          <div className="popup-item-left">
            <span className="popup-item-left__icon">
              <MdLanguage />
            </span>
            <span className="popup-item-left__name">Language</span>
          </div>
          <div className="popup-item-right">
            <Button variant="outlined">
              <FaChevronRight />
            </Button>
          </div>
        </li>
        {/* Setting Privacy */}
        <li>
          <div className="popup-item-left">
            <span className="popup-item-left__icon">
              <AiOutlineSetting />
            </span>
            <span className="popup-item-left__name">Settings & Privacies</span>
          </div>
          <div className="popup-item-right">
            <Button variant="outlined">
              <FaChevronRight />
            </Button>
          </div>
        </li>
        {/* Logout User Account*/}
        {user ? (
          <li onClick={onLogout}>
            <div className="popup-item-left">
              <span className="popup-item-left__icon">
                <FiLogOut />
              </span>
              <span className="popup-item-left__name">Logout</span>
            </div>
            <div className="popup-item-right popup-item-hide">
              <Button variant="outlined">
                <FaChevronRight />
              </Button>
            </div>
          </li>
        ) : null}
      </ul>
    </SettingWrapper>
  );
};

export default SettingAccount;
