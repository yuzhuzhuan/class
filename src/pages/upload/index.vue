<template>
  <div class="app-container">
    <el-card class="h-full overflow-y-auto" :header="$t('upload.title')">
      <div class="mt-10 w-50">
        <YkUpload
          :drag="true"
          :limit="3"
          :file-size="5"
          :clear-files="clearFiles"
          @uploadOk="uploadOk"
        ></YkUpload>
      </div>
      <div class="mt-10 w-50">
        <YkUpload
          list-type="text"
          :limit="5"
          :file-type="['apk', 'zip']"
          :file-size="100"
          @uploadOk="uploadOk"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </YkUpload>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Mixins } from 'vue-property-decorator';
import YkUpload from '@/components/YkUpload/index.vue';

@Component({
  components: { YkUpload },
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
    name: '',
  };

  /**
   * 控制是否清空已上传文件列表
   */
  clearFiles = false;

  fileFormData?: FormData;

  // 上传成功
  uploadOk(file: any) {
    console.log('val', file);

    // const fd = new FormData();
    // fd.append('file', file);
    // this.fileFormData = fd;
    // 不加弹框 可在这个方法中调用api  并清空已上传文件列表
    // this.clearFiles = true;
    const chunkSize = 2 * 1024 * 1024; // 分片大小 2M
    const chunks = []; // 保存分片数据
    const token = new Date();
    const { name } = file;
    let chunkCount = 0;
    let sendChunkCount = 0;
    // 拆分文件
    if (file.size < chunkSize) {
      chunks.push(file.slice(0));
    } else {
      let start = 0;
      let end = 0;
      let flag = true;
      while (flag) {
        end += chunkSize;
        const blob = file.slice(start, end);
        start += chunkSize;

        if (!blob.size) {
          flag = false;
          break;
        }
        chunks.push(blob);
      }
    }
    chunkCount = chunks.length;

    for (let i = 0; i < chunks.length; i++) {
      const fd = new FormData();
      fd.append('token', token.toString());
      fd.append('f1', chunks[i]);
      fd.append('index', i.toString());
      // eslint-disable-next-line no-loop-func
      this.xhrSend(fd, () => {
        sendChunkCount += 1;
        if (sendChunkCount === chunks.length) {
          console.log('上传完成，发送合并请求');
          const formD = new FormData();
          formD.append('type', 'merge');
          formD.append('token', token.toString());
          formD.append('chunkCount', chunkCount.toString());
          formD.append('fileName', name);
          this.xhrSend(formD);
        }
      });
    }
  }

  xhrSend(fd: any, cb?: any) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'url/upload', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        cb && cb();
      }
    };
    xhr.send(fd);
  }

  // // 上传成功
  // uploadOk(val: any) {
  //   console.log('val', val);

  //   const fd = new FormData();
  //   fd.append('file', val.file);
  //   this.fileFormData = fd;
  //   // 不加弹框 可在这个方法中调用api  并清空已上传文件列表
  //   this.clearFiles = true;
  // }

  click() {
    this.dialogFlag = true;
    this.mode = 'upload';
  }

  // 关闭弹框
  async closeDone() {
    const formData: FormData = this.fileFormData || new FormData();
    let path = '';
    if (this.form.name) {
      path += `${this.form.name}/`;
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
