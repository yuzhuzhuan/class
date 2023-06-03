import Vue, { VueConstructor } from 'vue';

const VueI18nPlus = {
  install: (vue: VueConstructor) => {
    // 替代 $t()，返回 string 类型，以通过 ts 的类型检查
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
