<template>
  <el-card :class="[{ 'yk-flex-col': flex, 'yk-card-scroll': scroll }]" v-bind="$attrs">
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

  @Prop({ type: Boolean, required: false })
  scroll?: boolean;
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
.yk-card-scroll {
  ::v-deep {
    .el-card__body {
      @apply overflow-y-auto;
    }
  }
}
</style>
