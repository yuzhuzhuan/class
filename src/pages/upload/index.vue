<template>
  <div class="app-container">
    <el-card shadow="never">
      <h1 class="text-center">upload组件</h1>
      <div class="w-50 mt-10">
        <YkUpload :drag="true" @uploadOk="uploadOk" :clearFiles="clearFiles"></YkUpload>
      </div>
      <div class="w-50 mt-10">
        <YkUpload listType="picture-card" :limit="5">
          <i slot="default" class="el-icon-plus"></i>
        </YkUpload>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Mixins } from 'vue-property-decorator';
import YkUpload from '@/components/YK_Upload/index.vue';

@Component({
  components: { YkUpload }
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
  uploadOk(val: any) {
    const fd = new FormData();
    fd.append('file', val.file);
    this.fileFormData = fd;
    // 不加弹框 可在这个方法中调用api  并清空已上传文件列表
    this.clearFiles = true;
  }

  click() {
    this.dialogFlag = true;
    this.mode = 'upload';
  }

  // 关闭弹框
  async closeDone() {
    const formData: FormData = this.fileFormData || new FormData();
    let path = '';
    if (this.form.name) {
      path += `${this.form.name  }/`;
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
