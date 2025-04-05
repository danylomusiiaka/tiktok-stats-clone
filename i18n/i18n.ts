import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import enTranslations from "./en.json";
import uaTranslations from "./ua.json";
import rusTranslations from "./rus.json";

const resources = {
  en: { translation: enTranslations },
  ua: { translation: uaTranslations }, 
  rus: { translation: rusTranslations },
};

i18n
  .use(initReactI18next)
  .use({
    type: "languageDetector",
    async: true,
    detect: (callback) => {
      const locale = Localization.locale;
      callback(locale.split("-")[0]); // Gets language code without region
    },
    init: () => {},
    cacheUserLanguage: () => {},
  })
  .init({
    compatibilityJSON: "v4", // Recommended for i18next
    resources,
    fallbackLng: "rus",
    lng: Localization.locale.split("-")[0], // Set initial language
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Required for React Native
    },
  });

export default i18n;
