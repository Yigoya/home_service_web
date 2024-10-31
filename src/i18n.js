import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "choose_your_best": "Choose Your Best",
      // Add more translations here
    },
  },
  am: {
    translation: {
      "choose_your_best": "ባለሙያ ይምረጡ",
      // Add more translations here
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;