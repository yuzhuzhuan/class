<template>
  <ElButton v-bind="$attrs" :loading="pending" @click="onClick">
    <slot></slot>
  </ElButton>
</template>
<script lang="ts">
// Button 自动管理 loading 状态
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class YkButton extends Vue {
  @Prop({ type: Boolean, required: false })
  loading?: boolean;

  pending = false;

  private onClick() {
    // eslint-disable-next-line no-undef
    const clickFn = this.$listeners.click as YkFunction;

    if (clickFn) {
      const promise = clickFn();
      if (this.loading) {
        if (promise instanceof Promise) {
          this.pending = true;
          promise.finally(() => {
            this.pending = false;
          });
        } else {
          console.warn('YkButton 是异步提交组件，同步组件请使用 Button 组件');
        }
      }
    }
  }
}
</script>
