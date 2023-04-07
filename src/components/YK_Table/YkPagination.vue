<template>
  <div class="text-left">
    <el-pagination
      @size-change="tablePageSizeChange"
      @current-change="tablePageChange"
      :page-sizes="tablePageInfo.pageSizes"
      :page-size="tablePageInfo.pageSize"
      :current-page.sync="tablePageInfo.pageIndex"
      :total="total"
      v-show="allowShow"
      v-bind="attrs"
      background
      small
      class="!space-x-1"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { omit } from 'lodash-es';
import { Vue, Prop, Component } from 'vue-property-decorator';

const DEF_PAGE_INFO = {
  pageSizes: [2, 10, 20, 40, 60, 80, 100],
  pageIndex: 1,
  pageSize: 1,
  layout: 'total, sizes, prev, pager, next, jumper',
};
export type PageInfo = Partial<typeof DEF_PAGE_INFO>;
@Component({ inheritAttrs: false })
export default class YkPagination extends Vue {
  @Prop({ type: Object, required: true })
  pageInfo!: PageInfo;

  @Prop({ type: Number, required: true })
  total!: number;

  @Prop({ type: Boolean, default: false })
  hideOnSinglePage!: boolean;

  get tablePageInfo() {
    return Object.assign({}, DEF_PAGE_INFO, this.pageInfo, this.$attrs);
  }

  get allowShow() {
    return (
      (this.pageInfo.pageSize ?? 0) < Number.MAX_SAFE_INTEGER &&
      (!this.hideOnSinglePage || this.total > this.tablePageInfo.pageSize)
    );
  }

  private get attrs() {
    const opts = omit(DEF_PAGE_INFO, ['pageSize', 'pageIndex', 'pageSizes']);
    if ((this.pageInfo as any).displaySize === 'small') {
      opts.layout.replace('prev,', '');
      opts.layout.replace('next,', '');
    }
    return Object.assign({}, opts, this.$attrs);
  }

  // table 每页显示条数改变
  tablePageSizeChange(pageSize: number) {
    this.change({ pageSize, pageIndex: 1 });
  }

  // table 当前显示页改变
  tablePageChange(pageIndex: number) {
    this.change({ pageIndex });
  }

  // 触发表格刷新
  change(newPageInfo: PageInfo) {
    newPageInfo.pageSize = newPageInfo.pageSize || this.tablePageInfo.pageSize;
    this.$emit('change', Object.assign({}, this.pageInfo, newPageInfo));
  }
}
</script>

<style lang="scss">
::v-deep {
  .el-pagination__total {
    @apply mr-0 text-xs;
  }
  .el-input--mini {
    .el-input__inner,
    .el-input__icon {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
