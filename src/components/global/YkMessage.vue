<template>
  <div
    class="rounded flex border-1 text-xs min-h-7 min-w-60 pr-8 pl-3 items-center warntext"
    :class="{ visibility: isShow }"
    :style="style[type]"
  >
    <yk-icon :icon="style[type].icon" class="icon"></yk-icon>
    <span class="text-sm text-[#919794]"> {{ text }} </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class YkMessage extends Vue {
  @Prop({ type: Boolean, required: true })
  isShow!: true | false;
  @Prop({ type: String, required: true })
  text!: string;
  @Prop({ type: String, required: true, default: 'warning' })
  type!: 'success' | 'warning' | 'error' | 'info';

  style = {
    warning: {
      icon: 'mingcute:information-fill',
      color: '#ff9900',
      backgroundColor: '#fff5e6',
      borderColor: '#fde3bd',
    },
    error: {
      icon: 'mi:circle-error',
      color: '#f56c6c',
      backgroundColor: '#ffeee6',
      borderColor: '#f7cdbe',
    },
    success: {
      icon: 'mdi:success-circle',
      color: '#67c23a',
      backgroundColor: '#e6faf0',
      borderColor: '#c2e7b0',
    },
    info: {
      icon: 'ph:info-fill',
      color: '#409eff',
      backgroundColor: '#ecf5ff',
      borderColor: '#b3d8ff',
    },
  };
}
</script>

<style scoped>
.warntext {
  visibility: hidden;
}
.visibility {
  visibility: visible;
  color: #fde3bd;
}
</style>
