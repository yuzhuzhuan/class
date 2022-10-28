<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      row-key="id"
      border
      style="width: 100%"
      size="mini"
      :tree-props="{ children: 'children' }"
    >
      <!-- <el-table-column
        v-for="(item, index) in getColumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
      >
      </el-table-column> -->
      <template v-for="item in getColumn">
        <el-table-column
          v-if="!!item.slot"
          :key="(item.prop || item.key) + 'slot'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
          :align="item.align"
          :show-overflow-tooltip="item.tooltip"
          :sortable="item.sortable"
          :type="item.type"
        >
          <template #default="scope">
            <slot
              :name="item.slot"
              :row="scope.row"
              :index="scope.index"
            ></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop || item.key"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
          :align="item.align"
          :show-overflow-tooltip="item.tooltip"
          :sortable="item.sortable"
        >
        </el-table-column>
      </template>
      <el-table-column
        label="操作"
        v-if="columns.some((item) => item.slot === 'action')"
      >
        <template #default="scope">
          <el-button @click="edit(scope.row)" type="primar" size="mini"
            >编辑</el-button
          >
          <el-button @click="del(scope.row)" type="danger" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="totalNum">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { DEF_PAGE_INFO } from '@/assets/js/config';
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
export type PageInfo = Partial<typeof DEF_PAGE_INFO>;
@Component({})
export default class SpTable extends Vue {
  @Prop({ type: [Array], required: false })
  list?: Record<string, any>[];

  @Prop({ type: [Array], required: true })
  columns!: Array<any>;

  @Prop({ type: Number || String, required: false })
  totalNum!: number | string;

  @Prop({ type: Object, required: false })
  pageInfo!: Record<string, any>;

  @Prop({ type: Number, required: false })
  pageSize?: number;

  // 翻页时是否记忆选择项
  @Prop({ type: Boolean, required: false })
  checkRemember?: boolean;

  @Prop({ type: Boolean, default: true })
  selectable!: boolean;

  @Prop({ type: Function })
  getListFun!: Function;

  params = {} as Record<string, any>;
  dataList = [] as Record<string, any>[];
  checkAll = false;
  @Prop({}) currentPage!: number;
  @Prop({}) size!: number;
  @Prop({}) rowWidth!: string; // 横向滚动条尺寸
  @Watch('list')
  onListChange (newValue: any, oldValue: any) {
    this.dataList = this.list ?? [];
  }

  get tableData () {
    return [...this.dataList];
  }

  // 表头数据
  get getColumn (): Array<any> {
    const columns = this.columns.filter(
      (item) => item.label && item.slot !== 'action' /* && item.listeners */
    );
    return columns;
  }

  // 除 action 之外的 slots
  get columnSlots (): Array<any> {
    const columns = this.columns.filter(
      (item) => item.slot && item.slot !== 'action' /* && item.listeners */
    );
    return columns;
  }

  get actionListeners () {
    const action = this.columns.find((item) => item.slot === 'action');
    return action?.listeners || {};
  }

  mergePageInfo (pageInfo: PageInfo) {
    // 详情跳回列表时，定位 pageIndex
    const curRoute = this.$route.matched[this.$route.matched.length - 1];
    const curRoutePageIndex =
      window.sessionStorage.getItem(`${curRoute.path}-pageIndex`) || 0;
    const curRoutePageSize = window.sessionStorage.getItem(
      `${curRoute.path}-pageSize`
    );
    if (!Reflect.has(pageInfo, 'pageIndex')) pageInfo.pageIndex = +curRoutePageIndex || 1;
    if (!Reflect.has(pageInfo, 'pageSize') && curRoutePageSize) pageInfo.pageSize = +curRoutePageSize;
    window.sessionStorage.removeItem(`${curRoute.path}-pageIndex`);
    window.sessionStorage.removeItem(`${curRoute.path}-pageSize`);

    const { pageSize, pageIndex } = this.pageInfo;
    return Object.assign({ pageSize, pageIndex }, pageInfo);
  }

  edit (e: {}) {
    this.$emit('edit', e);
  }

  del (e: {}) {
    this.$emit('del', e);
  }

  handleSizeChange (val: number) {
    this.$emit('changeSize', val);
  }

  handleCurrentChange (val: number) {
    this.$emit('changePageIndex', val);
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
