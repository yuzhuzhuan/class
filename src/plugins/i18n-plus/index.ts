import Vue, { VueConstructor } from 'vue';

const VueI18nPlus = {
  install: (vue: VueConstructor) => {
    vue.prototype.$ts = function (...args: any[]): string {
      const res = this.$t(...args);
      if (process.env.NODE_ENV === 'development') {
        if (typeof res !== 'string') {
          throw new Error(`$t(${[...args]}) 的返回值不是一个 String`);
        }
      }
      return res;
    };
  },
};

Vue.use(VueI18nPlus);
