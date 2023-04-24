<template>
  <el-card :class="[{ 'yk-flex-col': flex || scroll, 'yk-card-scroll': scroll }]" v-bind="$attrs">
    <template v-if="$slots.header" #header>
      <!-- @slot refer ElCard.header -->
      <slot name="header"></slot>
    </template>
    <!-- @slot refer ElCard.body -->
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * 封装 ElCard，添加类似 YkFlexCol 的功能，body 自动撑开，以及 body 滚动
 * @see https://element.eleme.cn/#/zh-CN/component/card
 */
@Component
export default class YkCard extends Vue {
  /**
   * 是否启用 YkFlexCol 的功能
   */
  @Prop({ type: Boolean, required: false })
  flex?: boolean;

  /**
   * 是否启用 body 滚动，默认启用 flex
   */
  @Prop({ type: Boolean, required: false })
  scroll?: boolean;

  aa = {
    flex: true,
    click() {
      console.log(this.flex);
    },
  };

  onClick() {
    console.log(this.aa.click());
  }
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
