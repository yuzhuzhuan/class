import Vue from 'vue';
import { YkMessageBox } from '@/plugins/message-box';

declare module 'vue/types/vue' {
  interface Vue {
    $ykMsgbox: typeof YkMessageBox;
  }
}
