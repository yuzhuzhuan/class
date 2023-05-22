<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from 'vue-property-decorator';
import { CreateElement } from 'vue';

/**
 * 强制刷新组件
 */
@Component
export default class YkResetable extends Vue {
  /**
   * 当属性值变化时 reset 子组件
   *
   * 功能类似于在子组件直接添加 key 属性，不同之处在于接受任意值，而 key 属性只能是 string
   */
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
