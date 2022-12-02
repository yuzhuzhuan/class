<template>
  <div class="app-container">
    <el-card shadow="never">
      <div ref="echartsRef" :class="className" id="echartsRef"></div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';
@Component({
  name: 'echarts'
})
export default class YkEcharts extends Vue {
  /**
   * 表单的ref
   */
  @Ref() readonly echartsRef!: HTMLElement;

  /**
   * echarts数据
   */
  @Prop({ type: Object, required: true })
  options!: {};

  /**
   * 设置高度 windicss
   */
  @Prop({ required: true, default: 'h-120' })
  className!: string;

  mounted() {
    const myChart = echarts.init(this.echartsRef);
    if (this.options) {
      this.useEcharts(myChart, this.options);
    }
  }

  destroyed() {
    window.removeEventListener('resize', this.echartsResize);
  }

  echartsResize: any;
  useEcharts(myChart: echarts.ECharts, options: echarts.EChartsCoreOption) {
    if (options && typeof options === 'object') {
      myChart.setOption(options);
    }
    this.echartsResize = () => {
      myChart && myChart.resize();
    };
    window.addEventListener('resize', this.echartsResize, false);
  }
}
</script>
