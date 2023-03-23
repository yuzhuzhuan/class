<template>
  <div class="app-container">
    <el-card shadow="never ">
      <YKeditor v-model="content"></YKeditor>
      <div class="flex mt-5 footer justify-end">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
      <div class="mt-4">
        <p class="mb-4 text-2xl">富文本输入内容</p>
        <div v-html="detail"></div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YKeditor from '@/components/YK_Editor/index.vue';

@Component({
  components: { YKeditor },
})
export default class Editor extends Vue {
  content = '';
  detail = '';

  cancel() {
    console.log('取消');
    this.content = '';
  }

  save() {
    console.log('保存', this.content);
    this.detail = this.content;
  }
}
</script>

<style lang="scss" scoped></style>
