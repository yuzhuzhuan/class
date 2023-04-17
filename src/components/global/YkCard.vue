<template>
  <el-card :class="[{ 'yk-flex-col': flex }]" v-bind="$attrs">
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class YkCard extends Vue {
  @Prop({ type: Boolean, required: false })
  flex?: boolean;
}
</script>

<style scoped lang="postcss">
.yk-flex-col {
  ::v-deep {
    .el-card__body {
      @apply flex-1 min-h-0;
    }
  }
}
</style>
