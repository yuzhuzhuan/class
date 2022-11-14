
<template>
  <div class="app-container">
    <el-card shadow="never ">
      <!-- <YKeditor v-model="articleFrom.content"></YKeditor> -->
      <YKeditor v-model="content"></YKeditor>
       <div class="footer flex justify-end mt-5">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
      <div class="mt-4">
       <p class="text-2xl mb-4"> 富文本输入内容</p>
        <div v-html="this.detail"></div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import YKeditor from '@/components/YKeditor/index.vue';

@Component({
  name: 'editor',
  components: { YKeditor }
})
export default class extends Vue {
  content = '';
  detail=''
  articleFrom = {
    title: '',
    description: '',
    content: '',
    categoryId: null,
    templatePath: null,
    hret: 0,
    url: null,
    sort: undefined
  };

  cancel () {
    console.log('取消');
    this.content = ''
  }

  save () {
    console.log('保存', this.content);
    this.detail = this.content
  }
}
</script>

<style lang="scss" scoped>
</style>
