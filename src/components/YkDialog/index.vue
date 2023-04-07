<template>
  <el-dialog
    v-bind="attrs"
    :custom-class="
      size !== 'full' && size !== 'h-full'
        ? `flex flex-col max-w-[80vw] max-h-[80vh] overflow-hidden`
        : `flex flex-col max-h-hull h-full max-w-[80vw] overflow-hidden !my-0 px-10`
    "
    v-on="$listeners"
    @close="onClose"
  >
    <template #title>
      <slot name="title">
        <div class="flex w-full pb-2 items-center">
          <div class="flex font-bold space-x-3 flex-1 text-lg text-[#383838] items-center">
            <div><slot name="icon"></slot></div>
            <div class="flex-1">
              {{ title }}
              <slot name="describe"></slot>
            </div>
          </div>
          <div v-if="actionPosition === 'top'" class="flex-1 text-right">
            <template v-if="type === 'confirm'">
              <el-button type="primary" size="mini" :loading="mixinLoading" @click="onSave">
                {{ okText || '保存' }}
              </el-button>
              <el-button size="mini" type="primary" @click="$emit('on-cancel')"> 取消 </el-button>
            </template>
            <el-button
              v-else-if="type === 'alert'"
              size="mini"
              type="primary"
              @click="$emit('on-cancel')"
            >
              关闭
            </el-button>
          </div>
          <div v-else-if="actionPosition === 'bottom'" class="flex-1 text-right">
            <el-button size="mini" class="w-22" plain round @click="$emit('on-cancel')">
              <YkIcon icon="icon-park-outline:return" label="返回" :size="1" />
            </el-button>
          </div>
        </div>
      </slot>
    </template>
    <div class="h-full py-3 px-5">
      <slot></slot>
    </div>
    <template v-if="actionPosition === 'bottom'" #footer>
      <div class="space-x-5 text-center">
        <template v-if="type === 'confirm'">
          <el-button
            type="primary"
            size="mini"
            :loading="mixinLoading"
            class="w-23"
            @click="onSave"
          >
            {{ okText || '保存' }}
          </el-button>
          <el-button size="mini" type="info" class="w-23" @click="$emit('on-cancel')">
            取消
          </el-button>
        </template>
        <el-button
          v-else-if="type === 'alert'"
          size="mini"
          type="primary"
          class="w-23"
          @click="$emit('on-cancel')"
        >
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SpDialog extends Vue {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, default: 'confirm' })
  type!: 'alert' | 'confirm';

  @Prop({ type: String, required: false })
  size?: 'h-full' | 'w-full' | 'full';

  @Prop({ type: Function, required: true })
  onOk?: YkFunction;

  @Prop({ type: String })
  okText?: string;

  @Prop({ type: [String, Boolean], default: 'bottom' })
  actionPosition?: 'top' | 'bottom' | false;

  private mixinLoading = false;
  async onSave() {
    this.mixinLoading = true;
    try {
      await this.onOk?.();
    } finally {
      this.mixinLoading = false;
    }
  }

  private get attrs() {
    return Object.assign(
      {
        width: '800px',
        'show-close': false,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'destroy-on-close': true,
        'append-to-body': true,
      },
      this.$attrs,
    );
  }

  onClose(...args: any[]) {
    this.$emit('on-cancel', ...args);
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-dialog__body {
    flex: 1;
    min-height: 0;
    padding: 0;
    overflow-y: auto;
  }
}
</style>
