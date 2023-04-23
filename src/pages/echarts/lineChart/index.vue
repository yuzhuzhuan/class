<template>
  <div class="app-container">
    <el-card class="h-full overflow-auto" :header="$t('charts.lineChart')">
      <YKEcharts v-if="flag" :options="options" class-name="h-120"></YKEcharts>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YKEcharts from '@/components/YkEcharts/index.vue';
import service from '@/api/echarts';
import { EChartsOption } from 'echarts';
// 导入接口
@Component({
  components: { YKEcharts },
})
export default class LineChart extends Vue {
  /**
   * echarts显示数据
   */
  object = {} as any;
  /**
   * flag
   */
  flag = false;
  /**
   * echarts配置项
   */
  options: EChartsOption = {};
  async created() {
    await this.getList();
    if (this.object) {
      this.flag = true;
      this.options = {
        // 折线图标题以及颜色
        title: {
          text: 'Stacked Area Chart',
          textStyle: {
            color: '#a1a1a1',
          },
        },
        tooltip: {
          // 触发类型
          trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: { ...this.object.legend },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
              color: '#a1a1a1',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#a1a1a1',
            },
          },
        ],
        series: [...this.object.series],
      };
    }
  }

  // 获取数据
  async getList() {
    const { data } = await service.lineChart();
    this.object = data;
  }
}
</script>
