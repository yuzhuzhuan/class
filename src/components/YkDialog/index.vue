<template>
  <el-dialog
    v-bind="attrs"
    :custom-class="
      size !== 'full' && size !== 'h-full'
        ? `flex flex-col max-w-[80vw] max-h-[80vh] overflow-hidden`
        : `flex flex-col max-h-hull h-full max-w-[80vw] overflow-hidden !my-0 px-10`
    "
    v-on="$listeners"
    @close="onClose()"
  >
    <template #title>
      <!-- @slot 弹窗 header，优先级高于 prop.title -->
      <slot name="title">
        <div class="flex w-full pb-2 items-center">
          <div class="flex font-bold space-x-3 flex-1 text-lg text-[#383838] items-center">
            <div>
              <!-- @slot 弹窗 header 左上角的图标，当 v-slot:title 不存在时 -->
              <slot name="icon"></slot>
            </div>
            <div class="flex-1">
              {{ title }}
              <!-- @slot 弹窗 header 右上角的图标，当 v-slot:title 不存在时 -->
              <slot name="describe"></slot>
            </div>
          </div>
          <div v-if="actionPosition === 'top'" class="flex-1 text-right">
            <template v-if="type === 'confirm'">
              <el-button type="primary" size="mini" :loading="mixinLoading" @click="onSave">
                {{ $ts('dialog.okText') }}
              </el-button>
              <el-button size="mini" type="primary" @click="onClose()">
                {{ $ts('dialog.cancel') }}
              </el-button>
            </template>
            <el-button v-else-if="type === 'alert'" size="mini" type="primary" @click="onClose()">
              {{ $ts('dialog.close') }}
            </el-button>
          </div>
          <div v-else-if="actionPosition === 'bottom'" class="flex-1 text-right">
            <el-button size="mini" class="w-24" plain round @click="onClose()">
              <YkIcon icon="icon-park-outline:return" label="返回" :size="1" />
            </el-button>
          </div>
        </div>
      </slot>
    </template>
    <div class="h-full py-3 px-5">
      <!-- @slot 弹窗 body -->
      <slot></slot>
    </div>
    <template v-if="actionPosition === 'bottom'" #footer>
      <div class="space-x-5 text-center">
        <template v-if="type === 'confirm'">
          <el-button
            type="primary"
            size="mini"
            :loading="mixinLoading"
            class="w-24"
            @click="onSave"
          >
            {{ $ts('dialog.okText') }}
          </el-button>
          <el-button size="mini" type="info" class="w-24" @click="onClose()">
            {{ $ts('dialog.cancel') }}
          </el-button>
        </template>
        <el-button
          v-else-if="type === 'alert'"
          size="mini"
          type="primary"
          class="w-24"
          @click="onClose()"
        >
          {{ $ts('dialog.close') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * 封装 ElDialog
 *
 * 与 [YkResetable](#/全局组件/YkResetable)、[MixinDialog](#/Mixin/DialogMixin) 配合使用
 *
 * @see https://element.eleme.cn/#/zh-CN/component/dialog
 */
@Component
export default class YkDialog extends Vue {
  /** 标题 */
  @Prop({ type: String, required: true })
  title!: string;

  /** 弹窗类型 */
  @Prop({ type: String, default: 'confirm' })
  type!: 'alert' | 'confirm';

  /** 弹窗尺寸 */
  @Prop({ type: String, required: false })
  size?: 'h-full' | 'w-full' | 'full';

  /**
   * @ignore
   * 点确定时的回调
   */
  @Prop({ type: Function, required: false })
  onOk?: YkFunction;

  /** 确定按钮的替换文本 */
  @Prop({ type: String })
  okText?: string;

  /** 操作按钮的位置 */
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
    // todo 这个 emit 不显示，由 DialogMixin 提供
    /** @ignore */
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
