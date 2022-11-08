<template>
  <div class="app-container">
    <el-card shadow="never ">
      <div class="text-2xl text-center mb-6">富文本编辑器</div>
      <YKeditor v-model="content"></YKeditor>
      <div class="mt-20 w-full">
        <h3>配置项</h3>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%" >
            <el-table-column fixed prop="property" label="属性" width="150">
            </el-table-column>
            <el-table-column prop="value" label="内容" width="450">
            </el-table-column>
          </el-table>
        </div>
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

  /**
   * 表格数据
   */
  public tableData = [
    {
      property: 'value',
      value: '双向绑定的value值，使用示例：v-model=content'
    },
    {
      property: '基本配置',
      value: '基本配置示例：http://tinymce.ax-z.cn/demos/demo-classic.php'
    },
    {
      property: 'plugin',
      value:
        '插件使用：http://tinymce.ax-z.cn/configure/integration-and-setup.php'
    },
    {
      property: 'height',
      value: '富文本最小高度400px'
    }
  ];
}
</script>

<style lang="scss" scoped>
</style>
