<template>
  <span
    class="inline-block"
    :class="{
      'cursor-pointer': !isStatic,
    }"
  >
    <span class="iconify" :class="customClass" :data-icon="icon" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * 简单的 iconify 封装
 */
@Component
export default class YkIcon extends Vue {
  /**
   * 来自 iconify 的 iconName
   */
  @Prop({ type: String, required: true })
  icon!: string;

  /**
   * 传给 svg 图片的 class 属性
   */
  @Prop({ type: [String, Array, Object], required: false })
  customClass?: string | Record<string, boolean> | string[] | Array<Record<string, boolean>>;

  get isStatic() {
    return !this.$listeners.click;
  }
}
</script>

<style scoped></style>
