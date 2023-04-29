<template>
  <div class="yk-flex-col">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/**
 * 这是一个 layout 组件，更方便的使用 flex-col 布局模式
 *
 * @requires ./YkFlexColGrow.vue
 */
@Component
export default class YkFlexCol extends Vue {
  //
}
</script>

<style>
/* stylelint-disable-next-line scss/at-rule-no-unknown,csstree/validator */
@tailwind components;
@layer components {
  .yk-flex-col {
    @apply flex flex-col h-full;
  }
}
</style>
