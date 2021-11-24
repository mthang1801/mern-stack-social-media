import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources, { getLanguage } from './locales';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: getLanguage(),
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
