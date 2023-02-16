<template>
  <span class="inline-block">
    <span class="iconify" :class="className" :data-icon="icon" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class YkIcon extends Vue {
  @Prop({ type: String, required: true })
  icon!: string;

  @Prop({ type: [String, Array, Object] })
  className?: string | (string | Record<string, boolean>)[] | Record<string, boolean>;
}
</script>

<style scoped></style>
