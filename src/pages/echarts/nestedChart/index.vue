<template>
  <div class="app-container">
    <el-card class="h-full overflow-auto" :header="$t('charts.nestedChart')">
      <YKEcharts v-if="flag" :options="options" class-name="h-[30rem]"></YKEcharts>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import service from '@/services/echarts';
import YKEcharts from '@/components/YkEcharts/index.vue';
import { EChartsOption } from 'echarts';

@Component({
  components: { YKEcharts },
})
export default class NestedChart extends Vue {
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
          // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          trigger: 'item',
          // 字符串模板 {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          // 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name
          data: [
            'Direct',
            'Marketing',
            'Search Engine',
            'Email',
            'Union Ads',
            'Video Ads',
            'Baidu',
            'Google',
            'Bing',
            'Others',
          ],
          textStyle: {
            color: '#a1a1a1',
          },
        },
        series: [...this.list],
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
