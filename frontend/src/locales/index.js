import React from 'react';
import { en } from './translation.en';
import { vi } from './translation.vi';
import { useTranslation } from 'react-i18next';
import { US, VN } from 'country-flag-icons/react/3x2';
export const listLanguages = ['en', 'vi'];
const LOCALE_NAME = 'pul-locale';

export const setLanguage = (lng) =>
  typeof window !== undefined
    ? window.localStorage.setItem(LOCALE_NAME, lng)
    : null;

export const getLanguage = () => {
  if (typeof window !== 'undefined') {
    const lang = window.localStorage.getItem(LOCALE_NAME);
    if (!listLanguages.includes(lang)) {
      return 'vi';
    }
    return lang;
  }
  return 'vi';
};

export const configLocale = {
  en: { key: 'en', text: 'English', code: 'US', icon: <US /> },
  vi: { key: 'vi', text: 'Tiếng Việt', code: 'VN', icon: <VN /> },
};

export const locales = {
  en,
  vi,
};

const useLocale = () => {
  const { i18n, t, ready } = useTranslation();
  const lang = i18n.language || getLanguage();
  const { translation } = i18n?.store?.data[lang];
  return { lang, i18n, t, translation, ready };
};

export default useLocale;
