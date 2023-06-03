<template>
  <el-cascader
    v-bind="$attrs"
    :placeholder="placeholder"
    :lazy="lazy"
    :lazy-load="lazyLoad"
    v-on="$listeners"
  ></el-cascader>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CascaderNode, CascaderOption } from 'element-ui/types/cascader';

export type YkCascaderFormatter = YkFunction<CascaderOption, [any, CascaderNode<string, any>]>;

@Component({})
export default class YkCascader extends Vue {
  @Prop({ type: String, required: false, default: '选择省市' })
  placeholder!: string;
  @Prop({ type: Number, required: false, default: 2 })
  level!: number;
  @Prop({ type: Boolean, required: false, default: true })
  lazy!: boolean;
  @Prop({ type: Function, required: false })
  formatter?: YkCascaderFormatter;
  @Prop({ type: Function, required: false })
  load?: YkFunction<Promise<{ data: any[] }>>;

  lazyLoad(node: CascaderNode<any, any>, resolve: any) {
    const { level } = node;
    let id = '';
    if (level) {
      id = node.data.id;
    }

    if (this.load) {
      this.load({ id }).then(({ data }) => {
        if (data.length) {
          const nodes = this.formatter ? data.map((item) => this.formatter?.(item, node)) : data;
          resolve(nodes);
        }
      });
    }
  }
}
</script>
<style lang="scss">
.language {
  font-size: 28px;
}
</style>
