<template>
    <div class="app-container">
        <el-card shadow="never">
            柱状图
            <YKEcharts :options="options" className="h-120" v-if='flag'></YKEcharts>
        </el-card>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { getColumnChartApi } from '../../../../api/echarts'; // 导入接口
import YKEcharts from '@/components/YK_Echarts/index.vue';
@Component({
  components: { YKEcharts }
})
export default class ColumnChart extends Vue {
  /**
   * echarts显示数据
   */
  list = [];
  /**
   * flag
   */
  flag = false;
  /**
   * echarts配置项
   */
  options = {} as echarts.EChartsOption

  async created () {
    await this.getList();
    if (this.list.length) {
      this.flag = true;
      this.options = {
        // X坐标轴类型 https://echarts.apache.org/zh/option.html#xAxis.type
        xAxis: { type: 'category' },
        // 声明一个 Y 轴，数值轴
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
        dataset: {
          // 提供一份数据。
          source: [...this.list]
        }
      };
    }
  }

  // 获取数据
  async getList () {
    const {
      data: { list }
    } = await getColumnChartApi();

    this.list = list;
  }
}
</script>
