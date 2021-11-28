import React from 'react';

import {
  ListSelection,
  SelectionItem,
  LeftItem,
  LeftItemIcon,
  LeftItemText,
} from './styles/SettingSelecttionBoard.styles';
import { ListLocalesSelection } from './styles/LocalesSelectionBoard.styles';
import { configLocale } from '../../locales';
import { useTheme } from '../../theme';
import useLocale, { setLanguage } from '../../locales';
const LocalesSelectionBoard = ({ open, setOpenLocales }) => {
  const { theme } = useTheme();
  const { i18n } = useLocale();
  const onSelected = (key) => {
    setLanguage(key);
    i18n.changeLanguage(key);
    setOpenLocales(false);
  };

  return (
    <ListLocalesSelection theme={theme} open={open}>
      {Object.keys(configLocale).map((key) => (
        <SelectionItem
          key={configLocale[key].key}
          theme={theme}
          onClick={() => onSelected(configLocale[key].key)}
        >
          <LeftItem>
            <LeftItemIcon>{configLocale[key].icon}</LeftItemIcon>
            <LeftItemText>{configLocale[key].text}</LeftItemText>
          </LeftItem>
        </SelectionItem>
      ))}
    </ListLocalesSelection>
  );
};

export default LocalesSelectionBoard;
