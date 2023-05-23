import VueI18n from 'vue-i18n';
import Vue from 'vue';
import { cookieLang } from '@/utils/cookies';
import enLocale from './en';
import zhLocale from './zh';
import ElementLocale from 'element-ui/lib/locale';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
};
export function GetLanguage() {
  if (cookieLang.value) {
    return cookieLang.value;
  }
  // if has not choose language
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'en';
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh
  locale: GetLanguage(),
  // set locale messages
  messages,
});
ElementLocale.i18n((key: any, value: any) => i18n.t(key, value));
export default i18n;
