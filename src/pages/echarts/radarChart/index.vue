<template>
  <div class="app-container">
    <el-card shadow="never">
      雷达图
      <YKEcharts :options="options" className="h-120" v-if="flag"></YKEcharts>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getNestedChartApi } from '../../../../api/echarts'; // 导入接口
import YKEcharts from '@/components/YK_Echarts/index.vue';
@Component({
  components: { YKEcharts }
})
export default class RadarChart extends Vue {
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
  options = {} as echarts.EChartsOption;
  async created() {
    await this.getList();
    if (this.list.length) {
      this.flag = true;
      this.options = {
        title: {
          text: 'Basic Radar Chart',
          textStyle: {
            color: '#a1a1a1'
          }
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending'],
          textStyle: {
            color: '#a1a1a1'
          }
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      };
    }
  }

  // 获取数据
  async getList() {
    const { data } = await getNestedChartApi();
    this.list = data;
  }
}
</script>
