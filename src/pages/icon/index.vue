<template>
  <div class="app-container">
    <yk-card flex scroll shadow="never" :header="$ts('icon.title')">
      <div class="mt-5 text-center min-w-[75rem] grid gap-6 grid-cols-8">
        <div
          v-for="(item, index) in iconList"
          id="target"
          :key="index"
          class="cursor-pointer"
          :class="{ 'cursor-not-allowed': item.disabled, 'text-[#999]': item.disabled }"
          @click="copyText(item.icon, item.disabled)"
        >
          <YkIcon :icon="item.icon" class="text-2xl" />
          <p class="text-xl">{{ item.icon }}</p>
        </div>
      </div>
    </yk-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// svg组件
const collections = require('@iconify/json/json/ep.json');

interface IconList {
  icon: string;
  disabled: boolean;
}

@Component({
  components: {},
})
export default class Icon extends Vue {
  iconList = [] as IconList[];
  list = [1, 5, 13, 18, 26, 54, 66];
  async created() {
    Object.keys(collections.icons).forEach((key: string) => {
      this.iconList.push({ icon: `ep:${key}`, disabled: false });
    });
    this.iconList.forEach((item: any, index: number) => {
      if (this.list.includes(index)) {
        item.disabled = true;
      }
    });
  }

  // 单击复制icon名
  copyText(text: string, disabled: boolean) {
    if (disabled) return;

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
