<template>
    <div class="app-container">
        <el-card shadow="never">
            <h1 class="text-center">upload组件</h1>
            <el-button @click="click">点击上传</el-button>
            <YKDialog v-model="dialogFlag" :dialogFlag="dialogFlag" :mode="mode" @done="dialogFlag = false" @close="closeDone">
                <el-form label-width="80px" :model="form">
                    <el-form-item label="保存路径">
                        <el-input v-model.trim="form.name" placeholder="请输入保存路径"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <YKUpload :drag="true" @uploadOk="uploadOk" :clearFiles="clearFiles"></YKUpload>
                        <span>只能上传jpg/png文件，且不超过2MB</span>
                    </el-form-item>
                </el-form>
            </YKDialog>

            <div class="w-50 mt-10">
                <YKUpload :drag="true" @uploadOk="uploadOk" :clearFiles="clearFiles"></YKUpload>
            </div>
            <div class="w-50 mt-10">
                <YKUpload listType="picture-card" :limit="5">
                    <i slot="default" class="el-icon-plus"></i>
                </YKUpload>
            </div>
        </el-card>
    </div>
</template>
<script lang='ts'>

import { Component, Vue, Ref } from 'vue-property-decorator';
import YKDialog from '@/components/YK_Dialog/index.vue';
import YKUpload from '@/components/YK_Upload/index.vue';
@Component({
  components: { YKDialog, YKUpload }
})
export default class Upload extends Vue {
  /**
   * 控制弹框
   */
  dialogFlag = false;
  /**
   * 弹框标题
   */
  mode = ' ';
  /**
   * 路径名
   */
  form = {
    name: ''
  };

  /**
   * 控制是否清空已上传文件列表
   */
  clearFiles = false;
  /**
   * 表单的ref
   */
  @Ref() readonly UploadRef!: any;

  fileFormData?: FormData;

  // 上传成功
  uploadOk (val: any) {
    const fd = new FormData();
    fd.append('file', val.file);
    this.fileFormData = fd;
    // 不加弹框 可在这个方法中调用api  并清空已上传文件列表
    this.clearFiles = true;
  }

  click () {
    this.dialogFlag = true;
    this.mode = 'upload';
  }

  // 关闭弹框
  async closeDone () {
    const formData: FormData = this.fileFormData || new FormData();
    let path = '';
    if (this.form.name) {
      path += this.form.name + '/';
    }
    formData.append('path', path);
    // await UploadApi(formData);
    this.$message.success('上传文件成功!');
    this.dialogFlag = false;
    this.clearFiles = true;
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
