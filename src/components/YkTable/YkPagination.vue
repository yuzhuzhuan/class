<template>
  <div class="text-left">
    <el-pagination
      v-show="allowShow"
      :page-sizes="tablePageInfo.pageSizes"
      :page-size="tablePageInfo.pageSize"
      :current-page.sync="tablePageInfo.pageIndex"
      :total="tablePageInfo.total"
      v-bind="attrs"
      background
      small
      class="!space-x-1"
      @size-change="tablePageSizeChange"
      @current-change="tablePageChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { DEF_PAGE_INFO } from '@/assets/js/config';
import { omit } from 'lodash-es';
import { Vue, Prop, Component } from 'vue-property-decorator';

export type PageInfo = Partial<typeof DEF_PAGE_INFO>;
@Component({ inheritAttrs: false })
export default class YkPagination extends Vue {
  @Prop({ type: Object, required: true })
  pageInfo!: PageInfo;

  @Prop({ type: Boolean, default: false })
  hideOnSinglePage!: boolean;

  get tablePageInfo() {
    return Object.assign({ total: 0 }, DEF_PAGE_INFO, this.pageInfo, this.$attrs);
  }

  get allowShow() {
    return (
      (this.pageInfo.pageSize ?? 0) < Number.MAX_SAFE_INTEGER &&
      (!this.hideOnSinglePage || this.tablePageInfo.total > this.tablePageInfo.pageSize)
    );
  }

  private get attrs() {
    const opts = omit(this.tablePageInfo, ['pageSize', 'pageIndex', 'pageSizes']);
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
    const pageSize = newPageInfo.pageSize || this.tablePageInfo.pageSize;
    this.$emit('change', Object.assign({}, this.pageInfo, newPageInfo, { pageSize }));
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
