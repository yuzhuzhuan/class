import Vue from 'vue';
import * as ykOpts from '@/constants/options';
// import * as Api from '@/services/api'
// import { UserInfo } from './store/role';

declare module 'vue/types/vue' {
  interface Vue {
    getFormDataM<T extends Record<string, any>>(
      validation?: boolean | string,
      formRef?: string,
    ): Promise<T> | never;
    ykOpts: typeof ykOpts;

    // userinfo
    // userInfo: UserInfo;
    // permit: typeof Api
    // hasPermit: (data: string | string[]) => boolean
  }
}
