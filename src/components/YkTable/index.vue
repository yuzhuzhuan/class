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
      :cell-style="columnStyle"
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
                <YkTableButton
                  v-if="actionCol.listeners.edit"
                  text="编辑"
                  type="primary"
                  icon="majesticons:edit-pen-2"
                  @click="onActionClick('edit', scope)"
                />
                <YkTableButton
                  v-if="actionCol.listeners.detail"
                  text="详情"
                  type="default"
                  icon="majesticons:document-line"
                  @click="onActionClick('detail', scope)"
                />
                <YkTableButton
                  v-if="actionCol.listeners.remove"
                  slot="reference"
                  text="删除"
                  type="danger"
                  icon="ep:delete-filled"
                  @click="onActionClick('remove', scope)"
                />
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
      <YkPagination
        class="pull-right offset-bottom"
        :page-info="pageInfo"
        @change="request(params, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import YkPagination from './YkPagination.vue';
import YkTableButton from './YkTableButton.vue';
import YkTablePoptip from './YkTablePoptip.vue';

import { Vue, Prop, PropSync, Watch, Component, Emit, Ref } from 'vue-property-decorator';
import { RESPONSE_CONFIG } from '@/utils/request';
import { Table } from 'element-ui';
import { pick } from 'lodash-es';
import { DEF_PAGE_INFO } from '@/assets/js/config';

/**
 * @requires ./YkTableButton.vue
 */
@Component({
  inheritAttrs: false,
  components: { YkPagination, YkTablePoptip, YkTableButton },
})
export default class YkTable extends Vue {
  // 请求接口
  @Prop({ type: Array, required: false, default: () => [] })
  data!: Array<Record<string, any>>;
  @Prop({ type: Function, required: false })
  dataRequest?: YkFunction<Promise<any>>;

  @Prop({ type: [Array], required: true })
  columns!: Array<ColumnItem<any>>;

  @Prop({ type: Boolean, default: true })
  autoRequest!: boolean;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  // 每页显示几条数据
  // 当值为 0 时，不分页
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

  @Prop({ type: Function, required: false })
  columnStyle!: () => {};

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

  @Watch('data')
  onListChange() {
    this.request();
  }

  @Prop({ type: Boolean, required: false })
  disableCheck?: boolean;

  get actionCol(): ColumnItemAction<any> | null {
    const { slot, ...action } = this.cols.find((item) => item.slot === 'action') ?? ({} as any);
    return slot ? action : null;
  }
  onActionClick(type: keyof Required<ColumnItemAction<any>>['listeners'], scope: any) {
    this.actionCol?.listeners?.[type]?.(this.plainRow(scope.row), scope.index);
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

  private get showPagination() {
    return this.pageSize === 0 || this.dataRequest;
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
    if (this.dataRequest) {
      return this.dataRequest(params);
    } else {
      return Promise.resolve({ data: this.data });
    }
  }

  @Emit('on-success')
  async request(params?: Record<string, any>, pageInfo?: { pageSize: number; pageIndex: number }) {
    // 当参数属性为 '' 或者 [] 时删除这个属性
    if (params) {
      Object.keys(params).forEach((key, index, ins: Record<string, any>) => {
        let value = ins[key];
        if (value === '') Reflect.deleteProperty(ins, key);
        else if (Array.isArray(value)) {
          value.length || Reflect.deleteProperty(ins, key);
        } else if (value?.constructor === Object) {
          value = Object.assign({}, value);
          ins[key] = value;
          Object.keys(value).forEach(
            (subkey) => value[subkey] === '' && Reflect.deleteProperty(value, subkey),
          );
          Object.keys(value).length || Reflect.deleteProperty(ins, key);
        }
      });
    }

    this.params = params ?? this.params;
    params = Object.assign({}, this.params, !this.showPagination ? {} : pageInfo ?? this.pageInfo);
    params.pageNum = params.pageIndex;
    Reflect.deleteProperty(params, 'pageIndex');
    Reflect.deleteProperty(params, 'total');

    this.dataLoading = true;
    return this.getList(params)
      .then((res: any) => {
        const { page = params?.page, data = [] } = res;
        if (this.showPagination) {
          this.pageInfo.total = res[RESPONSE_CONFIG.TOTAL] ?? 0;
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

  pageInfo: {
    pageIndex: number;
    pageSize: number;
    total: number;
  } = Object.assign({ total: 0 }, pick(DEF_PAGE_INFO, ['pageSize', 'pageIndex']));

  private created() {
    Object.assign(
      this.pageInfo,
      { pageSize: this.pageSize ?? this.pageInfo.pageSize },
      this.pageOptions,
    );
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
