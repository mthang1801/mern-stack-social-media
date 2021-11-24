import { useTranslation } from 'react-i18next';
import { getLanguage } from '../../locales';
const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || getLanguage();
  return { lang, i18n, t };
};

export default useLanguage;
