import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';


i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    hi: hi,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
const word = i18next.t('hello')



export default i18next;