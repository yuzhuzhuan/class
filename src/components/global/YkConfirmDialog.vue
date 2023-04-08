<template>
  <div class="Dialog">
    <el-dialog title="操作确认" :visible.sync="dialogFlag" width="23%" :before-close="handleClose">
      <template #title>
        <slot name="title" class="font-600 text-sm">
          {{ title }}
        </slot>
      </template>
      <slot>
        <div class="flex">
          <div class="mr-2 ml-4">
            <yk-icon icon="mdi:question-mark-circle-outline" class="text-[#ff9900] icon"></yk-icon>
          </div>
          <div>
            <p class="font-600 text-base text-[#676666]">{{ content }}</p>
            <p class="text-[#ababab] text-sm">{{ details }}</p>
            <p class="text-[#ababab] text-sm">{{ detailText }}</p>
          </div>
        </div>
      </slot>
      <template #footer>
        <slot name="footer">
          <span class="dialog-footer">
            <el-button
              @click="handleClose()"
              style="width: 80px"
              class="bg-[#f9f9f9] text-[#999999]"
              >取 消</el-button
            >
            <el-button type="primary" @click="save()" style="width: 80px">确 定</el-button>
          </span>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ConfirmDialog extends Vue {
  @Prop({}) dialogFlag!: false;
  @Prop({ type: String, required: false, default: '操作确认' })
  title!: string;

  @Prop({ type: String, required: false })
  content?: string;

  @Prop({ type: String, required: false })
  details?: string;

  @Prop({ type: String, required: false })
  detailText?: string;

  async save() {
    this.$emit('confirmDone');
  }

  handleClose() {
    this.$emit('close');
  }
}
</script>
<style scoped lang="scss">
.Dialog ::v-deep {
  .el-dialog__footer {
    border-top-width: 1px;
    border-top-color: #ebebeb;
  }
  .el-dialog__header {
    border-radius: 10px 10px 0 0;
    border-bottom-width: 1px;
    border-bottom-color: #ebebeb;
    font-weight: 600;
    font-size: 1rem;
    background-color: #f5f5f5;
  }

  .el-dialog {
    border-radius: 10px;
  }
  .icon {
    font-size: 26px;
  }
}
</style>
