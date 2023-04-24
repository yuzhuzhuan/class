<template>
  <ElButton v-bind="$attrs" :loading="pending" @click="onClick">
    <slot></slot>
  </ElButton>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * 包装 ElButton, 自动管理 loading 状态
 * @see https://element.eleme.cn/#/zh-CN/component/button
 */
@Component({ inheritAttrs: false })
export default class YkButton extends Vue {
  /**
   * 标识 click 回调是否是一个异步函数
   */
  @Prop({ type: Boolean, required: false })
  loading?: boolean;

  private pending = false;

  private onClick() {
    const clickFn = this.$listeners.click as YkFunction | undefined;
    if (clickFn) {
      const promise = clickFn();
      if (this.loading) {
        if (promise instanceof Promise) {
          this.pending = true;
          promise.finally(() => {
            this.pending = false;
          });
        } else {
          console.warn('当 loading 为 true 时，@click 需传入一个异步函数');
        }
      }
    } else {
      // NOTE: not works, just for document
      /**
       * 当 loading 为 true 时，需传入一个异步函数
       */
      this.$emit('click');
    }
  }
}
</script>
