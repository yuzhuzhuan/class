<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AppMain extends Vue {
  get key() {
    return this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  /* 50= navbar  50  */
  min-height: calc(100vh - 120px);
  overflow: hidden;
}

.fixed-header + .app-main {
  height: 100vh;
  padding-top: 50px;
  overflow: auto;
}
</style>
