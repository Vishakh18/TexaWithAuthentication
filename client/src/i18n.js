// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to our website!",
        description: "We offer amazing services.",
      },
    },
    es: {
      translation: {
        welcome: "¡Bienvenido a nuestro sitio web!",
        description: "Ofrecemos servicios increíbles.",
      },
    },
    fr: {
      translation: {
        welcome: "Bienvenue sur notre site Web!",
        description: "Nous offrons des services incroyables.",
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en", // if user language not available

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
