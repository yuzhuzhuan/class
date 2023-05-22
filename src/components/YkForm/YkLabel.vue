<template>
  <div>
    <template v-for="(letter, index) in label"
      ><span v-if="index" :key="letter + index" :style="`padding-left: ${offset}em`"></span
      >{{ letter }}</template
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * label 等宽显示
 */
@Component
export default class YkLabel extends Vue {
  @Prop({ type: Number, required: true })
  total!: number;

  get label(): string[] {
    const text = (this.$slots as any)?.default[0]?.text?.trim() ?? '';
    return text.split('');
  }

  get offset() {
    return (this.total - this.label.length) / (this.label.length - 1);
  }
}
</script>

<style scoped></style>
