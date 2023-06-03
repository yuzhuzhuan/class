<template>
  <el-upload
    ref="UploadRef"
    v-loading="loading"
    action="#"
    :http-request="uploadOk"
    :before-upload="beforeUpload"
    :file-list="fileList"
    :on-exceed="handleExceed"
    :on-error="handleUploadError"
    element-loading-text="拼命上传中"
    element-loading-spinner="el-icon-loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </slot>
  </el-upload>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator';
import YKDialog from '@/components/YkDialog/index.vue';
import XLSX from 'xlsx';

@Component({
  components: { YKDialog },
})
export default class YkUpload extends Vue {
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
   * 是否把上传的Excel渲染到页面
   */
  @Prop({ type: Boolean, required: false, default: false })
  isRender!: boolean;
  /**
   * 上传成功
   */
  @Prop({ type: Function, required: false })
  onSuccess?: YkFunction;
  /**
   * 表单的ref
   */
  @Ref() readonly UploadRef!: any;
  /**
   * 上传的文件列表
   */
  fileList = [];
  excelData = {
    header: null,
    results: null,
  };
  loading = false;

  @Watch('clearFiles', { immediate: true })
  onClearFiles(newVal: any) {
    if (newVal) {
      this.UploadRef.clearFiles();
    }
  }

  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeUpload(file: any) {
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
    if (this.fileType.includes('xlsx') && this.isRender) this.readerData(file);
    return true;
  }
  // 超过上传数量
  handleExceed() {
    this.$message.warning(`上传文件数量不能超过 ${this.$attrs.limit} 个!`);
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
    this.$emit('uploadOk', file.file);
  }

  generateData(params: any) {
    this.excelData.header = params.header;
    this.excelData.results = params.results;
    this.onSuccess && this.onSuccess(this.excelData);
  }
  readerData(rawFile: any) {
    this.loading = true;
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target!.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const header = this.getHeaderRow(worksheet);
        const results = XLSX.utils.sheet_to_json(worksheet);
        this.generateData({ header, results });
        this.loading = false;
        resolve();
      };
      reader.readAsArrayBuffer(rawFile);
    });
  }
  getHeaderRow(sheet: any) {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C;
    const R = range.s.r;
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) {
      /* walk every column in the range */
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
      /* find the cell in the first row */
      let hdr = `UNKNOWN ${C}`; // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
      headers.push(hdr);
    }
    return headers;
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
