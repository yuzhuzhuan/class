<template>
  <div v-cloak class="h-full">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import watermark from '@/plugins/watermark';
import { cookieUser } from '@/utils/cookies';

export default Vue.extend({
  name: 'LayoutBlank',
  mounted() {
    const { watermark: mark } = cookieUser.value ?? {};
    mark && watermark.set(mark);
  },
});
</script>
