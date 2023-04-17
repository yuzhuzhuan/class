<template>
  <div class="inline-block">
    <el-popconfirm
      v-if="popVisible"
      transfer
      confirm
      v-bind="$attrs"
      @on-popper-hide="popVisible = false"
      v-on="$listeners"
    >
      <div slot="reference" ref="pop">
        <slot></slot>
      </div>
    </el-popconfirm>
    <div v-else @click="showPop">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class YkTablePoptip extends Vue {
  popVisible = false;
  showPop() {
    this.popVisible = true;
    this.$nextTick(() => {
      setTimeout(() => {
        (this.$refs.pop as HTMLDivElement).click();
      }, 100);
    });
  }
}
</script>
<style lang="css">
.el-popconfirm__action {
  margin-top: 6px;
}
</style>
