<template>
  <div class="yk-flex-col">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class YkFlexCol extends Vue {
  //
}
</script>

<style scoped>
@layer components {
  .yk-flex-col {
    @apply flex flex-col h-full;
  }
}
</style>
