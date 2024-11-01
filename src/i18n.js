import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "choose_your_best": "Choose Your Best Technician",
      "filter_by": "Filter By",
      "rating": "Rating",
      "price": "Price",
      "etb": "ETB",
      "location": "Select your location",
      "locations": {
        "select": "Select your location",
        "bole": "Bole",
        "akaki_kality": "Akaki Kality",
        "gullele": "Gullele",
        "kirkos": "Kirkos",
        "lideta": "Lideta"
      },
      'search':'Search by name',
    },
    
  },
  am: {
    translation: {
      "choose_your_best": "ባለሙያ ይምረጡ",
      "filter_by": "ያጣሩ",
      "rating": "ደረጃ",
      "price": "ዋጋ",
      "etb": "ብር",
      "location": "የእናንተን ቦታ ይምረጡ",
      "locations": {
        "select": "የእናንተን ቦታ ይምረጡ",
        "bole": "ቦሌ",
        "akaki_kality": "አቃቂ ቃሊቲ",
        "gullele": "ጉለሌ",
        "kirkos": "ቂርቆስ",
        "lideta": "ልደታ"
      },
      'search':'በስም ፈልግ',
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
