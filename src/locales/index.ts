import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// tips: export each translation to a seperate file
const resources = {
  en: {
    translation: require("./en.json"),
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    compatibilityJSON: "v3",
    fallbackLng: "en",
    // keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

//HELPERS
//https://onecompiler.com/javascript/3x5u4x6h4

/*
let x = [
  "Thanks for confirming\Nyour email, log in below:",
]

x = x.map((item, index) => {
  return {
    ["CONFIRMED_EMAIL5_".toUpperCase() + item.split(" ").map(v => {
      return (v.slice(0, 8))
    }).join("_").toUpperCase().replace(/ /g, "_").slice(0, 24)]: item
  }
})

//console.log(JSON.stringify(x))
for (let index = 0; index < x.length; index++) {
  const element = x[index];
  console.log(Object.keys(element) + ': "' + element[Object.keys(element)] + '",')
}*/
