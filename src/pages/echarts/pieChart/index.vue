<template>
  <div class="app-container">
    <el-card shadow="never">
      饼图
      <YKEcharts :options="options" className="h-170" v-if="flag"></YKEcharts>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import service from '@/api/echarts';
import YKEcharts from '@/components/YkEcharts/index.vue';
import { EChartsOption } from 'echarts';

@Component({
  components: { YKEcharts },
})
export default class PieChart extends Vue {
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
  options: EChartsOption = {};
  async created() {
    await this.getList();
    if (this.list.length) {
      this.flag = true;
      this.options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['rose 1', 'rose 2', 'rose 3', 'rose 4', 'rose 5', 'rose 6', 'rose 7', 'rose 8'],
          textStyle: {
            color: '#a1a1a1',
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [60, 280],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 33, name: 'rose 2' },
              { value: 28, name: 'rose 3' },
              { value: 22, name: 'rose 4' },
              { value: 20, name: 'rose 5' },
              { value: 15, name: 'rose 6' },
              { value: 12, name: 'rose 7' },
              { value: 10, name: 'rose 8' },
            ],
          },
        ],
      };
    }
  }

  // 获取数据
  async getList() {
    const { data } = await service.nestedChart();
    this.list = data;
  }
}
</script>
