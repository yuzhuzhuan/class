<template>
  <div class="app-container">
    <el-card shadow="never">
      <h1 class="text-center">Icon组件</h1>
      <div class="min-w-300 min-h-140 text-center grid inline-grid grid-cols-8 mt-10">
        <div v-for="(item, index) in iconList" :key="index" class="mb-10" id="target">
          <YkIcon :icon="item" class="text-2xl" />
          <p class="text-xl cursor-pointer" @click="copyText(item)">{{ item }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YkIcon from '@/components/global/YkIcon.vue';
 // svg组件
const collections = require('@iconify/json/json/ep.json');

@Component({
  components: { YkIcon }
})
export default class Icon extends Vue {
  iconList = [] as string[];
  async created() {
    Object.keys(collections.icons).forEach((key: string) => {
      this.iconList.push(`ep:${  key}`);
    });
  }

  // 单击复制icon名
  copyText(text: string) {
    const inputElement = document.createElement('input');
    inputElement.value = text;
    document.body.appendChild(inputElement);
    inputElement.select(); // 选中文本
    document.execCommand('copy'); // 执行浏览器复制命令
    inputElement.remove();
    this.$message.success('复制成功');
  }
}
</script>
