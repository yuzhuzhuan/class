import Vue from 'vue';
import moment from 'moment';
// import { Bus } from '@/plugins/bus'

declare module 'vue/types/vue' {
  interface Vue {
    $moment: typeof moment;
    // event bus
    // $bus: any;
  }
}
