<template>
  <div id="echartsRef" ref="echartsRef" :class="className"></div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component({
  name: 'echarts',
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
  @Prop({ required: false, default: 'h-120' })
  className!: string;

  myChart = null as null | echarts.ECharts;
  mounted() {
    this.myChart = echarts.init(this.echartsRef);

    if (this.options) {
      this.useEcharts(this.myChart, this.options);
    }
  }

  destroyed() {
    window.removeEventListener('resize', this.echartsResize);
  }

  echartsResize() {
    return this.myChart?.resize();
  }

  useEcharts(myChart: echarts.ECharts, options: echarts.EChartsCoreOption) {
    if (options && typeof options === 'object') {
      myChart.setOption(options);
    }
    window.addEventListener('resize', this.echartsResize.bind(this), false);
  }
}
</script>
