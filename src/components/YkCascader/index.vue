<template>
  <el-cascader
    v-bind="$attrs"
    :placeholder="placeholder"
    :props="props"
    v-on="$listeners"
  ></el-cascader>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class YkCascader extends Vue {
  @Prop({ type: String, required: false, default: '选择省市' })
  placeholder!: string;
  @Prop({ type: Number, required: false, default: 2 })
  level!: number;

  @Prop({ type: Function, required: false })
  getAreaInfo?: YkFunction<Promise<any>>;
  props = {
    lazy: true,
    lazyLoad: this.lazyLoad,
  };
  lazyLoad(node: any, resolve: any) {
    const { level } = node;
    let id = '';
    if (level) {
      id = node.data.id;
    }

    if (this.getAreaInfo) {
      this.getAreaInfo({ id }).then((data: any) => {
        if (data.data.length) {
          const nodes = data.data.map((item: any) => {
            item.label = item.name;
            // NOTE mock使用的name查询，使用接口需要替换该参数
            item.value = item.name;
            item.leaf = level >= 2;
            return item;
          });
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
