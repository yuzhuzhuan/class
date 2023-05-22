<template>
  <div>
    <el-button type="primary" @click="dialogEditM.show()">新增</el-button>
    <el-button type="primary" @click="dialogEditM.show({ name: '张三' })">编辑</el-button>
    <!-- YkResetable: 在弹窗关闭时 reset 弹窗实例  -->
    <YkResetable>
      <ExampleDialog
        v-model="dialogEditM.visible"
        :data="dialogEditM.data"
        @done="onQueryM"
      ></ExampleDialog>
    </YkResetable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DialogCtrl } from '@/plugins/mixins/MixinDialog';
import ExampleDialog from './_example.vue';

@Component({ components: { ExampleDialog }, name: 'PageDialogEditExample' })
export default class ExampleDialogPage extends Vue {
  dialogEditM = new DialogCtrl();
  onQueryM(data: any) {
    setTimeout(() => {
      alert(JSON.stringify(data));
    }, 0);
  }
}
</script>
