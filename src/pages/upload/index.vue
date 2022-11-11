<template>
  <div class="app-container">
    <h1 class="text-center">upload组件</h1>
    <el-button @click="click">点击上传</el-button>
    <YKDialog
      v-model="dialogFlag"
      :dialogFlag="dialogFlag"
      :mode="mode"
      @done="dialogFlag = false"
      @close="closeDone"
    >
      <el-form label-width="80px" :model="form">
        <el-form-item label="保存路径">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入保存路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-upload
            ref="upload"
            drag
            show-file-list
            action="#"
            :limit="5"
            :http-request="uploadOk"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :auto-upload="true"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </YKDialog>
    <div class="mt-5">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        class="w-40"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>
<script lang='ts'>
/* eslint-disable */
import { Component, Vue, Ref } from 'vue-property-decorator';
import YKDialog from '@/components/YKdialog/index.vue'
@Component({
  name: 'upload',
  components: { YKDialog }
})
export default class extends Vue {
  dialogFlag = false; // 控制弹框
  mode = ' ';
  form = {
    name: ''
  };

  type = '';
  dialogImageUrl = '';
  dialogVisible = false;
  disabled = false;

  /**
   * 表单的ref
   */
  @Ref() readonly UploadRef!: any;

  fileList = [];

  fileFormData?: FormData;

  beforeAvatarUpload (file: any) {
    return file;
  }

  // 上传成功
  uploadOk (val: any) {
    const fd = new FormData();
    fd.append('file', val.file);
    this.fileFormData = fd;
  }

  click () {
    this.dialogFlag = true;
    this.mode = 'upload';
    console.log('上传', this.dialogFlag, this.mode);
  }

  async closeDone () {
    const formData: FormData = this.fileFormData || new FormData();
    let path = '';
    if (this.form.name) {
      path += this.form.name + '/';
    }
    formData.append('path', path);
    // console.log(formData);
    // await UploadApi(formData);
    this.$message.success('上传文件成功!');
    this.dialogFlag = false;
    this.$router.go(0);
  }

  handleRemove (file: any) {
    console.log(file);
  }

  handlePictureCardPreview (file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  handleDownload (file: any) {
    console.log(file);
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
