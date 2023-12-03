import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dataEn from "./files/en.json";
import dataRu from "./files/ru.json";

i18n.use(initReactI18next).init({
    lng:"en",
    fallbackLng:"en",
    resources:{
      en:{
        translation:dataEn
      },
      ru:{
        translation:dataRu
      }
    },
    interpolation:{
     escapeValue:false
    }
});

export default i18n