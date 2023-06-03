<template>
  <div style="display: inline-block">
    <label class="radio-label" style="padding-left: 0">文件名: </label>
    <el-input
      v-model="filename"
      placeholder="请输入文件名(默认excel-list)"
      style="width: 345px"
      prefix-icon="el-icon-document"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class FilenameOption extends Vue {
  @Prop({ type: String, required: false })
  value!: String;

  get filename() {
    return this.value;
  }
  set filename(val) {
    this.$emit('input', val);
  }
}
</script>
