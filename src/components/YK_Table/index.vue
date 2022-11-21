<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      row-key="id"
      border
      style="width: 100%"
      :tree-props="{ children: 'children' }"
    >
      <template v-for="item in getColumn">
        <el-table-column
          v-if="!!item.slot"
          :key="(item.prop || item.key) + 'slot'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
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
          :min-width="item.minWidth"
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
        min-width="200"
      >
        <template #default="scope">
          <el-button @click="edit(scope.row)" type="primar"
            >编辑</el-button
          >
          <el-button @click="del(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="totalNum">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageIndex"
        :page-sizes="[1, 2 ,5, 10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { DEF_PAGE_INFO } from '@/assets/js/config';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
export type PageInfo = Partial<typeof DEF_PAGE_INFO>;
@Component({})
export default class YkTable extends Vue {
  /**
   * 表格数据
   */
  @Prop({ type: [Array], required: true })
  list?: Record<string, any>[];

  /**
   * 表头数据
   */
  @Prop({ type: [Array], required: true })
  columns!: Array<any>;

  /**
   * 数据总数量
   */
  @Prop({ type: Number || String, required: false })
  totalNum!: number | string;

  /**
   * 页码数据
   */
  @Prop({ type: Object, required: false })
  pageInfo!: Record<string, any>;

  dataList = [] as Record<string, any>[];

  @Watch('list')
  onListChange () {
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
