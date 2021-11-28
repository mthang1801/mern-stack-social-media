import React, { useState, useRef, useEffect } from 'react';
import { IoIosSettings } from 'react-icons/io';
import Button from '../Controls/ButtonDefaultCircle';
import { SettingWrapper, DialogContent } from './styles/SettingAccount.styles';

import { useTheme } from '../../theme';

import LocalesSelectionBoard from './LocalesSelectionBoard';
import SettingsSelectionBoard from './SettingsSelectionBoard';
const SettingAccount = () => {
  const { theme } = useTheme();
  const [togglePopup, setTogglePopup] = useState(false);
  const [openLocales, setOpenLocales] = useState(false);
  const settingRef = useRef(false);
  useEffect(() => {
    function handleClickOutsidePopup(e) {
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        setTogglePopup(false);
        setOpenLocales(false);
      }
    }
    window.addEventListener('click', (e) => {
      handleClickOutsidePopup(e);
    });
    return () =>
      window.removeEventListener('click', (e) => {
        handleClickOutsidePopup(e);
      });
  }, [togglePopup, openLocales]);

  const controlPopupDisplay = () => {
    if (togglePopup) {
      if (openLocales) {
        return <LocalesSelectionBoard open={openLocales} />;
      }
      return <SettingsSelectionBoard setOpenLocales={setOpenLocales} />;
    }
    return;
  };

  return (
    <SettingWrapper ref={settingRef} theme={theme}>
      <Button onClick={() => setTogglePopup((prevStatus) => !prevStatus)}>
        <IoIosSettings />
      </Button>
      <DialogContent>
        <LocalesSelectionBoard
          open={togglePopup && openLocales}
          setOpenLocales={setOpenLocales}
        />
        <SettingsSelectionBoard
          open={togglePopup && !openLocales}
          setOpenLocales={setOpenLocales}
        />
      </DialogContent>
    </SettingWrapper>
  );
};

export default SettingAccount;
