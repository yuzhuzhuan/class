<template>
    <div class="app-container">
        <h1>This is an about page</h1>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { GetUserApi } from '../../../api/login'; // 导入接口
@Component({
  name: 'home'
})
export default class extends Vue {
  async created () {
    const res = await GetUserApi({ username: 'admin', password: '123456' })
    console.log('返回数据', res);
  }
}
</script>
