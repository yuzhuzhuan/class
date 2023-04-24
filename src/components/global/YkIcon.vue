<template>
  <span class="inline-block">
    <span class="iconify" :class="className" :data-icon="icon" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * 简单的 iconify 封装
 */
@Component
export default class YkIcon extends Vue {
  @Prop({ type: String, required: true })
  icon!: string;

  @Prop({ type: [String, Array, Object], required: false })
  className?: string | Record<string, boolean> | string[] | Array<Record<string, boolean>>;
}
</script>

<style scoped></style>
