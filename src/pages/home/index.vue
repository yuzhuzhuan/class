<template>
  <div class="app-container">
    <h1>This is an about page</h1>
    <el-button @click="click">点击上传</el-button>
    <Dialog
        v-model="dialogFlag"
        :dialogFlag="dialogFlag"
        :mode="mode"
        @done="dialogFlag = false"
        @close="closeDone">
     <el-form label-width="80px" :model="form">
      <el-form-item label="保存路径">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入保存路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          action="#"
          :limit="1"
          :http-request="uploadOk"
          :on-preview="handlePreview"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="true"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
    </Dialog>
  </div>
</template>
<script lang='ts'>

import { Component, Vue, Ref } from 'vue-property-decorator';
import Dialog from '@/components/Dialog/index.vue';
@Component({
  name: 'home',
  components: { Dialog }
})
export default class extends Vue {
  dialogFlag = false // 控制弹框
  mode =' '
  form = {
    name: ''
  };

  fileList = [];

  fileFormData?: FormData;

  beforeAvatarUpload (file: any) {
    return file;
  }

  handleRemove (file: any, fileList: any) {
    // console.log(file, fileList);
  }

  handlePreview (file: any) {
    // console.log(file);
  }

  // 上传成功
  uploadOk (val: any) {
    const fd = new FormData();
    fd.append('file', val.file);
    this.fileFormData = fd;
  }

  click () {
    this.dialogFlag = true
    this.mode = 'upload'
  }

  closeDone () {
    this.dialogFlag = false
    console.log('guanbi');
  }
}
</script>
