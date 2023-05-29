<template>
  <div>
    <el-upload
      ref="UploadRef"
      v-loading="loading"
      :drag="drag"
      :list-type="listType"
      show-file-list
      action="#"
      :limit="limit"
      :http-request="uploadOk"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :auto-upload="true"
      :on-exceed="handleExceed"
      :on-error="handleUploadError"
      element-loading-text="拼命上传中"
      element-loading-spinner="el-icon-loading"
      multiple
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </slot>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator';
import YKDialog from '@/components/YkDialog/index.vue';

@Component({
  components: { YKDialog },
})
export default class YkUpload extends Vue {
  /**
   * 是否启用推拽上传
   */
  @Prop({ type: Boolean, required: false })
  drag!: boolean;

  /**
   * 最大允许上传个数
   */
  @Prop({ type: Number, required: false })
  limit!: 1;

  /**
   * 文件列表的类型
   */
  @Prop({ type: String, required: false })
  listType!: 'text' | 'picture' | 'picture-card';

  /**
   * 是否清空已上传的文件列表
   */
  @Prop({ type: Boolean, required: false })
  clearFiles!: boolean;

  /**
   * 单个上传文件大小限制
   */
  @Prop({ type: Number, required: false, default: 2 })
  fileSize!: Number;
  /**
   * 允许上传的文件类型
   */
  @Prop({
    type: Array,
    required: false,
    default: () => ['doc', 'zip', 'png', 'jpg', 'jpeg'],
  })
  fileType!: string[];

  /**
   * 表单的ref
   */
  @Ref() readonly UploadRef!: any;
  /**
   * 上传的文件列表
   */
  fileList = [];

  loading = false;

  @Watch('clearFiles', { immediate: true })
  onClearFiles(newVal: any) {
    if (newVal) {
      this.UploadRef.clearFiles();
    }
  }

  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeAvatarUpload(file: any) {
    this.loading = true;
    // 校检文件类型
    if (this.fileType) {
      let fileExtension = '';
      if (file.name.lastIndexOf('.') > -1) {
        fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1);
      }
      const isTypeOk = this.fileType.some((type) => {
        return fileExtension && fileExtension.indexOf(type) > -1;
      });
      if (!isTypeOk) {
        this.$message.error(`文件格式不正确，请上传${this.fileType.join('/')}格式文件！`);
        this.loading = false;
        return false;
      }
    }
    // 校检文件大小
    if (this.fileSize) {
      // MB
      const fileSize = file.size / 1024 / 1024;
      const isLt = fileSize < this.fileSize;
      if (!isLt) {
        this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
        this.loading = false;
        return false;
      }
    }

    return true;
  }
  // 超过上传数量
  handleExceed() {
    this.$message.warning(`上传文件数量不能超过 ${this.limit} 个!`);
    this.loading = false;
  }
  // 上传失败
  handleUploadError(err: any) {
    this.$message.error(`上传失败[${err}], 请重试`);
    this.loading = false;
  }
  // 上传成功
  uploadOk(file: any) {
    this.loading = false;
    /**
     * beforeAvatarUpload返回true时触发
     *
     * @property {File} 上传成功返回的file
     */
    this.$emit('uploadOk', file.file);
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-upload {
    width: 100%;
  }
  .el-upload .el-upload-dragger {
    width: 100%;
  }
}
</style>
