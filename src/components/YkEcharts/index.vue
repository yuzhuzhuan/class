<template>
  <div id="echartsRef" ref="echartsRef" :class="className"></div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { debounce } from 'lodash-es';

@Component({})
export default class YkEcharts extends Vue {
  sidebarElm = null as any;
  resizeHandler = null as any;
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
   * 设置高度 className
   */
  @Prop({ required: false, default: 'h-120' })
  className!: string;

  myChart = null as null | echarts.ECharts;
  mounted() {
    this.myChart = echarts.init(this.echartsRef);

    if (this.options) {
      this.useEcharts(this.myChart, this.options);
    }
    this.initListener();
  }

  destroyed() {
    window.removeEventListener('resize', this.echartsResize);
    this.resizeHandler = null;
    this.sidebarElm &&
      this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
  }

  echartsResize() {
    return this.myChart?.resize();
  }

  useEcharts(myChart: echarts.ECharts, options: echarts.EChartsCoreOption) {
    if (options && typeof options === 'object') {
      myChart.setOption(options);
    }
  }
  activated() {
    if (!this.resizeHandler) {
      this.initListener();
    }
    this.echartsResize();
  }
  initListener() {
    this.resizeHandler = debounce(() => {
      this.echartsResize();
    }, 100);
    window.addEventListener('resize', this.resizeHandler);

    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  }
  sidebarResizeHandler(e: any) {
    if (e.propertyName === 'width') {
      this.resizeHandler();
    }
  }
}
</script>
