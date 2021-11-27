import React, { useState, useRef, useEffect } from 'react';
import { IoIosSettings } from 'react-icons/io';
import Button from '../Controls/ButtonDefaultCircle';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useThemeUI } from 'theme-ui';
import { FaChevronRight, FaRegSun } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import ButoonColorMode from '../Controls/ButtonColorMode';
import { userVar } from '../../apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { logout } from '../Auth/Auth.utility';
const SettingAccount = ({ className }) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const { colorMode } = useThemeUI();
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
    <SettingWrapper className={className} ref={settingRef} theme={colorMode}>
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
            <ButoonColorMode />
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

const SettingWrapper = styled.div`
  position: relative;
  ul.popup-setting {
    position: absolute;
    transition: var(--mainTransition);
    top: 110%;
    width: 80vw;
    max-width: 360px;
    border: 1px solid var(--gray-light);
    right: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    padding: 0.4rem;
    background-color: ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-card-dark)'
        : 'var(--color-card-default)'};
    color: ${({ theme }) =>
      theme === 'dark'
        ? 'var(--color-text-dark)'
        : 'var(--color-text-default)'};
    box-shadow: var(--lightShadow);
    z-index: 2;
    & li {
      width: 100%;
      display: flex;
      padding: 0.3rem 0.7rem;
      justify-content: space-between;
      transition: var(--mainTransition);
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) =>
          theme === 'dark'
            ? 'var(--color-background-dark)'
            : 'var(--color-background-default)'};
        color: ${({ theme }) =>
          theme === 'dark'
            ? 'var(--color-text-dark)'
            : 'var(--color-text-default)'};
      }
    }
  }

  .popup-item {
    &-left {
      display: flex;
      align-items: center;
      &__icon {
        display: flex;
        font-size: 1.3em;
        margin-right: 0.25rem;
        color: ${({ theme }) =>
          theme === 'dark'
            ? 'var(--color-text-dark)'
            : 'var(--color-text-default)'};
      }
    }
    &-right {
    }
  }

  .user-profile {
    border-bottom: 1px solid var(--gray-light);
    margin-bottom: 0.5rem;
  }

  .direct-user-profile {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    .user-image-container {
      width: 3rem;
      height: 3rem;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 1rem;
    }
  }

  .popup-item-hide {
    visibility: hidden;
    opacity: 0;
  }

  .popup-setting-hide {
    visibility: hidden;
    opacity: 0;
    transition: var(--mainTransition);
  }
`;

export default React.memo(SettingAccount);
