<template>
  <div class="app-container">
    <yk-card flex scroll shadow="never" :header="$ts('excel.export')">
      <div class="yk-flex-col">
        <div class="mb-3">
          <FilenameOption v-model="filename" />
          <el-button
            :loading="downloadLoading"
            class="ml-3"
            type="primary"
            icon="el-icon-document"
            @click="handleDownload"
          >
            导出文件
          </el-button>
        </div>
        <div class="yk-flex-col-grow">
          <YkTable ref="table" :columns="tableColumns" :data="list" height="100%" class="h-full">
          </YkTable>
        </div>
      </div>
    </yk-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import FilenameOption from './components/FilenameOption.vue';
import { MixinTable } from '@/plugins/mixins';
import { parseTime } from '@/utils';
import service from '@/services/user';

interface Excel {
  date: string;
  name: string;
  phone: number;
  age: string;
  address: string;
}
@Component({
  components: { FilenameOption },
})
export default class ExportExcel extends Mixins(MixinTable) {
  list = [
    {
      date: '2018-05-02',
      name: '姚磊',
      phone: 13907855662,
      age: 12,
      address: '广东省深圳市罗湖区仙湖路160号',
    },
    {
      date: '2016-08-04',
      name: '张三',
      phone: 17572726887,
      age: 16,
      address: '广东省珠海市香洲区新月桥',
    },
    {
      date: '2006-03-01',
      name: '易芳',
      phone: 15810078421,
      age: 18,
      address: '上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1519 弄',
    },
    {
      date: '2012-12-03',
      name: '傅静',
      phone: 17131722232,
      age: 15,
      address: '贵州省黔东南苗族侗族自治州金沙江路 1516 号',
    },
  ];
  downloadLoading = false;
  filename = '';

  handleDownload() {
    this.downloadLoading = true;
    import('@/plugins/excel').then((excel) => {
      const tHeader = ['日期', '姓名', '手机号', '年龄', '地址'];
      const filterVal = ['date', 'name', 'phone', 'age', 'address'];
      const data = this.formatJson(filterVal, this.list);
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: this.filename,
      });
      this.downloadLoading = false;
    });
  }
  formatJson(filterVal: any, jsonData: any) {
    return jsonData.map((v: any) =>
      filterVal.map((j: any) => {
        if (j === 'timestamp') {
          return parseTime(v[j], '');
        } else {
          return v[j];
        }
      }),
    );
  }
  tableRequest = service.query;
  removeRequestM = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<Excel>> = [
      { label: '日期', prop: 'date' },
      { label: '姓名', prop: 'name' },
      { label: '手机号', prop: 'phone' },
      { label: '年龄', prop: 'age' },
      { label: '地址', prop: 'address', width: 300 },
    ];
    return data;
  }
}
</script>
