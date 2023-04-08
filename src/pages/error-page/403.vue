<template>
  <div class="app-container">
    <div class="flex h-full items-center justify-center">
      <img :src="errGif" alt="" />
      <div class="ml-50">
        <p class="font-600 text-8xl text-[#666666]">403</p>
        <p class="my-5 text-xl text-[#a6adba]">非常抱歉，您无权访问该页面</p>
        <yk-button type="primary" @click="$router.push('/')">返回首页</yk-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Page401 extends Vue {
  errGif = `${require('@/assets/401-images/401.gif')}?${+new Date()}`;
  ewizardClap = 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646';
  dialogVisible = false;

  back() {
    if (this.$route.query.noGoBack) {
      this.$router.push({ path: '/dashboard' });
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: calc(100vh);
}
</style>
