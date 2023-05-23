<template>
  <div v-cloak class="h-full">
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import watermark from '@/plugins/watermark';
import { getUserData } from '@/utils/cookies';

export default Vue.extend({
  name: 'LayoutBlank',
  async mounted() {
    if (getUserData()) {
      const userInfo = JSON.parse(getUserData());
      watermark.set(userInfo.watermark);
    }
  },
});
</script>
