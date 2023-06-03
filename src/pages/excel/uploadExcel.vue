<template>
  <div class="app-container">
    <yk-card flex scroll shadow="never" :header="$ts('excel.upload')">
      <YkUpload
        :limit="1"
        :file-type="['xlsx']"
        :file-size="1"
        drag
        is-render
        :show-file-list="false"
        :on-success="handleSuccess"
      >
      </YkUpload>

      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </yk-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YkUpload from '@c/YkUpload/index.vue';

@Component({ components: { YkUpload } })
export default class UploadExcel extends Vue {
  tableData = [] as any;
  tableHeader = [] as any;

  handleSuccess(params: any) {
    this.tableData = params.results;
    this.tableHeader = params.header;
  }
}
</script>
