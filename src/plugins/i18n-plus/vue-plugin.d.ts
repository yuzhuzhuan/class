import Vue from 'vue';
import VueI18n from 'vue-i18n';

interface VueI18nTs {
  (key: VueI18n.Path, values?: VueI18n.Values): string;
  (key: VueI18n.Path, locale: VueI18n.Locale, values?: VueI18n.Values): string;
}

declare module 'vue/types/vue' {
  interface Vue {
    $ts: VueI18nTs;
  }
}
