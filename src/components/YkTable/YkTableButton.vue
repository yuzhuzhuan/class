<template>
  <el-button :type="type" size="mini" :plain="type !== 'text'" @click.native.stop="$emit('click')">
    <yk-icon v-if="icon" :icon="icon" class="mr-1 align-bottom"></yk-icon>
    <slot>{{ text }}</slot>
  </el-button>
</template>

<script lang="ts">
// 在 table 中 button 的封装
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class YkTableButton extends Vue {
  @Prop({ type: String })
  text?: string;

  @Prop({ type: String, default: 'text' })
  type?: string;

  @Prop({ type: String, required: false })
  icon?: string;
}
</script>
