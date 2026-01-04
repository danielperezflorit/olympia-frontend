import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import es from "./es.json";
import en from "./en.json";

// Detectar idioma del dispositivo
const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode || "es";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: systemLanguage, // Establecer el idioma detectado del sistema
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;