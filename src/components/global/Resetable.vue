<!--
 * @Author: yuzhuzhuan yuzhuzhuan@yekertech.com
 * @Date: 2022-10-21 11:43:28
 * @LastEditors: yuzhuzhuan yuzhuzhuan@yekertech.com
 * @LastEditTime: 2022-12-02 17:33:42
 * @FilePath: \vue2-ts-template\src\components\global\Resetable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 强制刷新组件 -->
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class Resetable extends Vue {
  // 从外部刷新
  @Prop({ required: false })
  readonly listen?: any;

  key = '';

  @Watch('listen')
  // 从内部刷新
  @Provide('resetSelf')
  updateKey() {
    this.key = Math.random().toString();
  }

  render(createElement: CreateElement) {
    // 子节点数组
    return createElement('div', { key: this.key }, this.$slots.default);
  }
}
</script>
