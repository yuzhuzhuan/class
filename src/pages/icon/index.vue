<template>
  <div class="app-container">
    <el-card shadow="never">
      <h1 class="text-center">Icon组件</h1>
      <div class="mt-10 text-center min-w-300 min-h-140 grid grid-cols-8 inline-grid">
        <div v-for="(item, index) in iconList" :key="index" class="mb-10" id="target">
          <YkIcon :icon="item" class="text-2xl" />
          <p class="cursor-pointer text-xl" @click="copyText(item)">{{ item }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// svg组件
const collections = require('@iconify/json/json/ep.json');

@Component({
  components: {},
})
export default class Icon extends Vue {
  iconList = [] as string[];
  async created() {
    Object.keys(collections.icons).forEach((key: string) => {
      this.iconList.push(`ep:${key}`);
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
