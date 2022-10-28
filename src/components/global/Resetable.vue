<!-- 强制刷新组件 -->
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class Resetable extends Vue {
  // 从外部刷新
  @Prop({ required: false })
  readonly listen?: any

  key = ''

  @Watch('listen')
  // 从内部刷新
  @Provide('resetSelf')
  updateKey () {
    this.key = Math.random().toString()
  }

  render (createElement: CreateElement) {
    // 子节点数组
    return createElement('div', { key: this.key }, this.$slots.default)
  }
}
</script>
