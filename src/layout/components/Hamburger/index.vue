
<template>
  <div :class="[{'is-active': isActive}]" @click="toggleClick">
    <YkIcon icon="bi:text-indent-left" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Hamburger extends Vue {
  @Prop({ default: false }) isActive!: boolean;

  toggleClick() {
    this.$emit('toggleClick');
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
