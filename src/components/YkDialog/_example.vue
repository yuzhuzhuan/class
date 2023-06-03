<template>
  <YkDialog v-bind="attrsM" title="用户编辑" ok-text="保存" v-on="listenersM">
    <template #icon>
      <i class="text-2xl dw-title-ic iconfont icon-bianji"></i>
    </template>
    <el-form ref="dialogFormM" :model="dialogFormM">
      <yk-form-item label="用户名" prop="name" required>
        <yk-input v-model.trim="dialogFormM.name" />
      </yk-form-item>
    </el-form>
  </YkDialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinDialog } from '@/plugins/mixins';

interface DialogFromData {
  name: string;
}

@Component
export default class ExampleDialog extends Mixins<MixinDialog<DialogFromData>>(MixinDialog) {
  dialogFormM = {
    name: '',
  };
}
</script>
