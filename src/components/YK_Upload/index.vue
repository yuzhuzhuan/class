<template>
  <el-upload
    ref="UploadRef"
    :drag="drag"
    :list-type="listType"
    show-file-list
    action="#"
    :limit="limit"
    :http-request="uploadOk"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList"
    :auto-upload="true"
  >
    <slot>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </slot>
  </el-upload>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator';
import YKDialog from '@/components/YK_Dialog/index.vue';
@Component({
  components: { YKDialog }
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
   * 表单的ref
   */
  @Ref() readonly UploadRef!: any;
  /**
   * 上传的文件列表
   */
  fileList = [];

  @Watch('clearFiles', { immediate: true })
  onClearFiles(newVal: any, oldVal: any) {
    if (newVal) {
      this.UploadRef.clearFiles();
    }
  }

  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeAvatarUpload(file: any) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
    return file;
  }

  // 上传成功
  uploadOk(val: any) {
    this.$emit('uploadOk', val);
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
