<template>
    <el-dialog :title="dialogTitle" class="device-add" :visible.sync="dialogFlag" :before-close="handleClose" width="30%">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="save()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'YKDialog'
})
export default class YKDialog extends Vue {
  /**
   * 控制dialog是否打开
   */
  @Prop({ type: Boolean, required: true })
  dialogFlag!: false;

  /**
   * dialog标题
   */
  @Prop({ type: String, required: true })
  mode!: 'add' | 'edit' | 'upload';

  /**
   * 表单的标题显示内容
   */
  get dialogTitle () {
    const map = {
      add: '新增',
      edit: '编辑',
      upload: '上传'
    };
    return map[this.mode];
  }

  handleClose () {
    this.$emit('done');
  }

  save () {
    this.$emit('close');
  }
}
</script>
<style lang='less' scoped></style>
