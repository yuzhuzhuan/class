<template>
  <div class="h-12 w-full">
    <div class="text-center w-full pt-10 text-3xl">请联系管理员，完善账号设置</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
import { GetUserApi } from '@/services/login';

@Component({ components: {} })
export default class PageBlank extends Vue {
  get userInfo() {
    return UserModule.useData ?? ({} as any);
  }

  async mounted() {
    if (UserModule.token && !UserModule.useData?.id) {
      const { data } = await GetUserApi();
      UserModule.setUserData(data);
    }
  }
}
</script>
