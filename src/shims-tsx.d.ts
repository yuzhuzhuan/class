import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    interface Element extends VNode {
      tag?: string;
    }
    interface ElementClass extends Vue {
      readonly $vnode: VNode;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
