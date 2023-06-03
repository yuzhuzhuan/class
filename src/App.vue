<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {}
</script>
<style lang="css">
/* stylelint-disable-next-line selector-max-id */
#app {
  height: 100%;
}
</style>
