<template>
  <div class="yk-flex-col-grow">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/**
 * @example [none]
 */
@Component
export default class YkFlexColGrow extends Vue {
  //
}
</script>

<style>
/* stylelint-disable scss/at-rule-no-unknown,csstree/validator */
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer components {
  .yk-flex-col-grow {
    @apply flex-1 min-h-0;
  }
}
</style>
