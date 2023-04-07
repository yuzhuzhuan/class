<template>
  <div class="flex flex-col sp-table relative">
    <el-table
      v-bind="$attrs"
      ref="table"
      v-loading="!!loading || dataLoading"
      :data="dataList"
      style="width: 100%"
      :max-height="maxHeight"
      :no-data-text="emptyText"
      class="flex-1"
      size="mini"
      :reserve-selection="reserveSelection"
      row-key="id"
      :tree-props="{ children: 'children' }"
      element-loading-text="数据加载中"
      element-loading-spinner="el-icon-loading"
      v-on="$listeners"
      @selection-change="onSelectionChange"
    >
      <template v-for="item in cols">
        <el-table-column
          v-if="item.slot === 'action' && actionCol"
          :key="(item.prop || item.key || '').toString() + 'slot'"
          v-bind="actionCol"
          label="操作"
          :header-align="actionCol.align"
          :align="actionCol.align"
          :show-overflow-tooltip="item.tooltip"
        >
          <template #default="scope">
            <div class="space-x-3 inline-block">
              <slot name="action" :row="plainRow(scope.row)" :index="scope.$index"></slot>
              <template v-if="actionCol && actionCol.listeners">
                <SpTableButton
                  v-if="actionCol.listeners.edit"
                  text="修改"
                  type="primary"
                  icon="majesticons:edit-pen-2"
                  @click="
                    actionCol &&
                      actionCol.listeners &&
                      actionCol.listeners.edit &&
                      actionCol.listeners.edit(plainRow(scope.row), scope.$index)
                  "
                />
                <SpTableButton
                  v-if="actionCol.listeners.detail"
                  text="编辑"
                  type="primary"
                  icon="majesticons:edit-pen-2"
                  @click="
                    actionCol &&
                      actionCol.listeners &&
                      actionCol.listeners.detail &&
                      actionCol.listeners.detail(plainRow(scope.row), scope.$index)
                  "
                />
                <SpTableButton
                  v-if="actionCol.listeners.remove"
                  text="删除"
                  type="danger"
                  icon="ep:delete-filled"
                  @click="
                    actionCol &&
                      actionCol.listeners &&
                      actionCol.listeners.remove &&
                      actionCol.listeners.remove(plainRow(scope.row), pageInfo, dataList)
                  "
                />
                <!-- <SpTablePoptip
                  v-if="actionCol.listeners.remove"
                  :title="
                    actionCol.listeners.removeConfirmTip || '确定删除该条数据吗？该操作无法撤回'
                  "
                  @click.native.stop
                  @confirm="
                    actionCol &&
                      actionCol.listeners &&
                      actionCol.listeners.remove &&
                      actionCol.listeners.remove(plainRow(scope.row), scope.$index, $route.path)
                  "
                >
                  <el-button type="danger" size="mini" plain
                    ><yk-icon icon="ep:delete-filled" class="mr-1 align-bottom"></yk-icon
                    >删除</el-button
                  >
                </SpTablePoptip> -->
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.slot"
          :key="(item.prop || item.key || '').toString() + 'slot'"
          v-bind="omitSlot(item)"
          :show-overflow-tooltip="item.tooltip"
        >
          <template #default="scope">
            <slot :name="item.slot" :row="plainRow(scope.row)" :index="scope.$index"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop || item.key"
          v-bind="item"
          :show-overflow-tooltip="item.tooltip"
        >
        </el-table-column>
      </template>
      <template slot="empty">
        <div v-show="!(!!loading || dataLoading)" class="my-10">
          <!-- TODO 求提供无数据图片 -->
          <!-- <img class="mx-auto" src="@/assets/images/table-empty.png" /> -->
          <div class="text-center !leading-8">暂无数据</div>
        </div>
      </template>
    </el-table>
    <div v-show="showPagination" class="py-6 clearfix">
      <!-- 分页 -->
      <SpPagination
        v-show="showPagination"
        class="pull-right offset-bottom"
        :page-info="pageInfo"
        :total="pageTotalMixin"
        @change="request(params, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SpPagination, { PageInfo } from './YkPagination.vue';
import SpTableButton from './YkTableButton.vue';
import SpTablePoptip from './YkTablePoptip.vue';

import { Vue, Prop, PropSync, Watch, Component, Emit, Ref } from 'vue-property-decorator';
import { RESPONSE_CONFIG } from '@/utils/request';
import { Table } from 'element-ui';

export type ColumnItem<T extends Record<string, any>> =
  | {
      prop: string;
      key?: string;
      slot: 'action';
      align?: 'center' | 'left' | 'right';
      fixed?: 'left' | 'right' | boolean;
      label?: string;
      minWidth?: number;
      width?: number;
      listeners?: {
        remove?: YkFunction<Promise<void>>;
        edit?: YkFunction<void>;
        detail?: YkFunction;
      };
      type?: 'selection' | 'index' | 'expand';
      formatter?: (row: T, column: ColumnItem<T>, cellValue: any, index: number) => any;
      tooltip?: boolean;
    }
  | {
      prop: keyof T;
      key?: string;
      type?: 'selection' | 'index' | 'expand';
      label: string;
      slot?: string;
      align?: 'center' | 'left' | 'right';
      fixed?: 'left' | 'right' | boolean;
      minWidth?: number;
      width?: number;
      className?: string;
      formatter?: (row: T, column: ColumnItem<T>, cellValue: any, index: number) => any;
      showOverflowTooltip?: boolean;
      selectable?: YkFunction;
      tooltip?: boolean;
    };

@Component({
  inheritAttrs: false,
  components: { SpPagination, SpTablePoptip, SpTableButton },
})
export default class YkTable extends Vue {
  // 请求接口
  @Prop({ type: [Function, Array], required: true })
  list!: YkFunction<Promise<any>> | Array<Record<string, any>>;

  @Prop({ type: [Array], required: true })
  columns!: Array<ColumnItem<any>>;

  @Prop({ type: Boolean, default: true })
  autoRequest!: boolean;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  // 每页显示几条数据
  @Prop({ type: Number, required: false })
  pageSize?: number;

  @Prop({ type: [Object], default: () => ({}) })
  pageOptions!: Record<string, any>;

  // 单选 | 多选
  @Prop({
    type: String,
    default: 'multi',
    validator(value: 'single' | 'multi' = 'multi') {
      return ['single', 'multi'].includes(value);
    },
  })
  checkMode!: 'single' | 'multi';

  // 无数据文案
  @Prop({ type: String, default: '暂无数据', required: false })
  emptyText?: string;

  // clone row data
  @PropSync('selection', { type: Array, required: false })
  private _selection?: Array<Record<string, any>>;

  @Prop({ type: [Boolean, Function], default: true })
  selectable!: boolean | ((row: any, rowIndex: number) => boolean);

  get selectableFn() {
    return typeof this.selectable === 'function' ? this.selectable : undefined;
  }

  get maxHeight() {
    let value = this.$attrs['max-height'] as string | number | undefined;
    value = value?.toString().endsWith('vh')
      ? (+value.toString().slice(0, -2) / 100) * window.innerHeight
      : value;
    return value;
  }

  dataLoading = false;
  dataList = [] as Array<Record<string, any>>;
  params: Record<string, any> = {};

  @Watch('list')
  onListChange() {
    if (Array.isArray(this.list)) this.request();
  }

  @Prop({ type: Boolean, required: false })
  disableCheck?: boolean;

  get actionCol():
    | (ColumnItem<any> & {
        listeners?: {
          remove?: YkFunction<Promise<void>>;
          edit?: YkFunction<void>;
          detail?: YkFunction;
          removeConfirmTip?: string;
        };
      })
    | null {
    const { slot, ...action } = this.cols.find((item) => item.slot === 'action') ?? ({} as any);
    return slot ? action : null;
  }

  private omitSlot(col: Record<string, any>) {
    if (col.slot) {
      const { slot, ...other } = col;
      return other;
    }
    return col;
  }
  private get cols(): Array<ColumnItem<any>> {
    let cols = this.columns.slice(0).map((item) => {
      const { width, label, slot } = item;
      let { minWidth } = item;
      if (!width && !minWidth && label && slot !== 'action') {
        minWidth = label.length * 13 + 20;
      }
      return { ...item, minWidth };
    });
    cols = this.colsWithFixed(cols) as Array<
      ColumnItem<any> & {
        minWidth: number;
      }
    >;
    return cols;
  }

  colsWithFixed(columns: Array<ColumnItem<any>>) {
    // 操作列
    const action = columns.find((item) => item.slot === 'action');
    if (action) {
      const defAction = { title: '操作', width: '200px', align: 'center', fixed: 'right' };
      action.fixed
        ? columns.splice(columns.indexOf(action), 1, Object.assign(defAction, action))
        : Reflect.deleteProperty(action, 'fixed');
    }
    // 可选列
    if (this.selectable && this._selection) {
      const selection = columns.find((item) => item.type === 'selection');
      selection && columns.splice(columns.indexOf(selection), 1);
      const data: ColumnItem<any> = {
        width: 38,
        type: 'selection',
        // @ts-ignore: 不明所以
        prop: '_selection',
        label: '_selection',
        selectable: this.selectableFn,
        align: 'center',
        fixed: 'left',
        className: this.checkMode === 'single' ? 'sp-table-check-single' : '',
        ...(selection ?? {}),
      };
      columns.unshift(data);
    }

    return columns;
  }

  colsWithPermits(columns: Array<ColumnItem<any>>) {
    const action = columns.find((item) => item.slot === 'action');
    // const innerPermits = Object.values(this.actionPermits) as string[]

    // 操作列权限
    if (action && /* !this.hasPermit(innerPermits) && */ !this.$scopedSlots?.action) {
      columns.splice(columns.indexOf(action), 1);
    }

    // 可选列权限
    const selection = columns.find((item) => item.type === 'selection');
    if (selection && !this.selectable) {
      columns.splice(columns.indexOf(selection), 1);
    }

    return columns;
  }

  get showPagination() {
    return (this.pageSize ?? 0) < Number.MAX_SAFE_INTEGER && !Array.isArray(this.list);
  }

  private plainRow(item: object) {
    if (item === null || typeof item !== 'object') return item;
    item = Object.assign({}, item);
    Object.keys(item).forEach((key) => key.startsWith('_') && Reflect.deleteProperty(item, key));

    return item;
  }

  // 翻页时是否记忆选中的行
  @Prop({ type: Boolean, default: false })
  reserveSelection!: boolean;

  onSelectionChange(selection: Array<Record<string, any>>) {
    selection = selection.map(this.plainRow);
    this._selection = this.onSelectionCascade(selection, this._selection);
  }

  private getList(params: YkFunction<Promise<any>> | Record<string, any>) {
    if (typeof this.list === 'function') {
      return this.list(params);
    } else {
      return Promise.resolve({ data: this.list });
    }
  }

  mergePageInfo(pageInfo: PageInfo) {
    // 详情跳回列表时，定位 pageIndex
    const curRoute = this.$route.matched[this.$route.matched.length - 1];
    const curRoutePageIndex = window.sessionStorage.getItem(`${curRoute.path}-pageIndex`) || 0;
    const curRoutePageSize = window.sessionStorage.getItem(`${curRoute.path}-pageSize`);
    if (!Reflect.has(pageInfo, 'pageIndex')) pageInfo.pageIndex = +curRoutePageIndex || 1;
    if (!Reflect.has(pageInfo, 'pageSize') && curRoutePageSize)
      pageInfo.pageSize = +curRoutePageSize;
    window.sessionStorage.removeItem(`${curRoute.path}-pageIndex`);
    window.sessionStorage.removeItem(`${curRoute.path}-pageSize`);

    const { pageSize, pageIndex } = this.pageInfo;
    return Object.assign({ pageSize, pageIndex }, pageInfo);
  }

  @Emit('on-success')
  async request(params: Record<string, any> = {}, pageInfo = {}, isReset = false) {
    // 翻页时带上次查询的条件
    Object.keys(params).forEach((key) => {
      let value = params[key];
      if (value === '') Reflect.deleteProperty(params, key);
      else if (Array.isArray(value)) {
        value.length || Reflect.deleteProperty(params, key);
      } else if (value?.constructor === Object) {
        value = Object.assign({}, value);
        params[key] = value;
        Object.keys(value).forEach(
          (subkey) => value[subkey] === '' && Reflect.deleteProperty(value, subkey),
        );
        Object.keys(value).length || Reflect.deleteProperty(params, key);
      }
    });
    this.params = params ?? this.params;
    params = Object.assign(
      {},
      this.params,
      this.pageSize === Number.MAX_SAFE_INTEGER ? {} : this.mergePageInfo(pageInfo),
    );
    params.pageNum = params.pageIndex;
    Reflect.deleteProperty(params, 'pageIndex');

    this.dataLoading = true;
    return this.getList(params)
      .then((res: any) => {
        const { page = params?.page, data = [] } = res;
        if ((this.pageSize ?? 0) < Number.MAX_SAFE_INTEGER) {
          this.pageTotalMixin = res[RESPONSE_CONFIG.TOTAL] ?? 0;
          this.pageInfo.pageIndex = params?.pageNum || 0;
          this.pageInfo.pageSize = params?.pageSize || 0;
        }
        this.dataList = data;
        !this.reserveSelection && this.selectable && this.onSelectionChange([]);
        return data;
      })
      .finally(() => {
        this.dataLoading = false;
      });
  }

  // 分组选择时候的级联
  onSelectionCascade(newValue: any[], oldValue: any[] = []) {
    if (!('tree-props' in this.$attrs)) return newValue;
    const { children } = this.$attrs['tree-props'] as unknown as {
      children: string;
    };
    const list = newValue.slice(0);
    const newSet = new Set(newValue.map((item) => item.id));
    const oldSet = new Set(oldValue.map((item) => item.id));
    // 新选的 rows
    newValue
      .filter((item) => !oldSet.has(item.id))
      .forEach((item) => {
        if (children in item) {
          item[children].forEach((si: any) => {
            newSet.has(si.id) || list.push(this.plainRow(si));
          });
        } else {
          const itemParent = this.dataList.find((i) =>
            i[children].some((si: any) => si.id === item.id),
          );
          itemParent?.[children].every((si: any) => newSet.has(si.id)) &&
            list.push(this.plainRow(itemParent));
        }
      });
    // 删除的
    oldValue
      .filter((item) => !newSet.has(item.id))
      .forEach((item) => {
        if (children in item) {
          item[children].forEach((si: any) => {
            if (newSet.has(si.id)) {
              const index = list.findIndex((i) => i.id === si.id);
              list.splice(index, 1);
            }
          });
        } else {
          const itemParent = this.dataList.find((i) =>
            i[children].some((si: any) => si.id === item.id),
          );
          if (itemParent?.[children].some((si: any) => !newSet.has(si.id))) {
            const index = list.findIndex((i) => i.id === itemParent.id);
            list.splice(index, 1);
          }
        }
      });
    return list.length !== newValue.length ? list : newValue;
  }

  @Ref('table') refTable?: Table;

  pageInfo = {} as any;
  pageInfoMixin = {
    pageIndex: 1,
    pageSize: 10,
  };

  pageTotalMixin = 0;

  private created() {
    this.pageInfo = Object.assign({}, this.pageOptions, this.pageInfoMixin);
    this.pageSize && (this.pageInfo.pageSize = this.pageSize);
    this.autoRequest && this.request();
  }
}
</script>

<style lang="scss">
.ivu-tooltip,
.icon-svg,
.sp-table-poptip,
.ivu-poptip {
  & + & {
    .sp-table .action-bar & {
      margin-left: 8px;
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep {
  .el-table th.el-table__cell {
    @apply font-normal bg-[#E7E7E7];
    color: #444;
  }
  .el-checkbox__input.is-disabled {
    display: none !important;
  }
  .el-table__empty-block {
    position: sticky;
    left: 0;
    justify-content: start;
    width: auto !important;
    text-align: left;
  }
  .el-table__empty-text {
    width: 100%;
  }
}
.sp-table {
  .no-data {
    line-height: 3em;

    text-align: center;
  }

  ::v-deep {
    th.sp-table-check-single {
      .ivu-table-cell-with-selection {
        display: none;
      }
    }
    .ivu-table-cell-with-selection {
      padding-right: 0;
    }
  }

  .check-all {
    margin-top: 20px;
  }
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
</style>
