<template>
  <YkCascader
    v-bind="$attrs"
    lazy
    :placeholder="placeholder"
    :formatter="formatter"
    :load="load"
    v-on="$listeners"
  ></YkCascader>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import api from '@/services/area';
import { CascaderNode, CascaderOption } from 'element-ui/types/cascader';

@Component({})
export default class YkCascaderArea extends Vue {
  @Prop({ type: String, required: false, default: '选择省市' })
  placeholder!: string;
  @Prop({ type: Number, required: false, default: 2 })
  level!: number;

  load = api.query;

  formatter(item: any, parentNode: CascaderNode<string, any>): CascaderOption {
    const { level } = parentNode;
    item.label = item.name;
    item.value = item.name;
    item.leaf = level >= 2;
    return item;
  }
}
</script>
<style lang="scss">
.language {
  font-size: 28px;
}
</style>
