import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  loginI18nEn,
  loginI18nFa
} from './views/auth/LoginView/IrisaLogin/i18n';
import {userI18nEn, userI18nFa} from './views/user/i18n'
import {calendarI18nEn, calendarI18nFa} from './views/calendar/i18n'
import { commonI18nEn, commonI18nFa } from './locales';
// the translations
// (tip move them in a JSON file and import them)

const localSettings = localStorage.getItem('settings');
let direction = null;
if (localSettings && localSettings.length > 0) {
  direction = JSON.parse(localSettings)['direction'];
} else {
  direction = 'rtl';
}

const resources = {
  en: {
    translations: {
      common: commonI18nEn,
      login: loginI18nEn,
      user: userI18nEn,
      calendar:calendarI18nEn
    }
  },
  fa: {
    translations: {
      common: commonI18nFa,
      login: loginI18nFa,
      user:userI18nFa,
      calendar:calendarI18nFa
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: direction === 'ltr' ? 'en' : 'fa',

    // keySeparator: false, // we do not use keys in form messages.welcome
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
