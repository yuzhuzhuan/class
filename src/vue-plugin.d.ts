import Vue from 'vue';
// import * as spOpts from '@/constants/opts';
// import { Bus } from '@/plugins/bus'
import { YkMessageBox } from '@/plugins/message-box';
// import * as Api from '@/services/api'
// import { UserInfo } from './store/role';

declare module 'vue/types/vue' {
  interface Vue {
    // event bus
    // $bus: any;
    $ykMsgbox: typeof YkMessageBox;

    // global mixin
    getFormDataM<T extends Record<string, any>>(
      validation?: boolean | string,
      formRef?: string,
    ): Promise<T> | never;
    validateM(): any;
    // spOpts: typeof spOpts;

    // userinfo
    // userInfo: UserInfo;
    // permit: typeof Api
    // hasPermit: (data: string | string[]) => boolean
    $reset(formRef: any, ...excludeFields: any): void;
  }
}
