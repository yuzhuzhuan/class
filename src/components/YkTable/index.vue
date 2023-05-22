<template>
  <div class="flex flex-col yk-table relative">
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
          :label="$ts('table.actions')"
          :header-align="actionCol.align"
          :align="actionCol.align"
        >
          <template #default="scope">
            <div class="space-x-3 inline-block">
              <!--
                @slot 操作列的内容<br/>可通过 columns.listeners 配置内置的操作，支持 remove,edit,detail
                @binding {RowData} row 行数据
                @binding {number} index 行号
              -->
              <slot name="action" :row="plainRow(scope.row)" :index="scope.$index"></slot>
              <template v-if="actionCol && actionCol.listeners">
                <YkTableButton
                  v-if="actionCol.listeners.edit"
                  :text="$ts('table.edit')"
                  type="primary"
                  icon="majesticons:edit-pen-2"
                  @click="onActionClick('edit', scope)"
                />
                <YkTableButton
                  v-if="actionCol.listeners.detail"
                  :text="$ts('table.detail')"
                  type="default"
                  icon="majesticons:document-line"
                  @click="onActionClick('detail', scope)"
                />
                <YkTableButton
                  v-if="actionCol.listeners.remove"
                  slot="reference"
                  :text="$ts('table.delete')"
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
        >
          <template #default="scope">
            <!--
              @slot 自定义列的内容
              @binding {string} name slot.name
              @binding {RowData} row 行数据
              @binding {number} index 行号
            -->
            <slot :name="item.slot" :row="plainRow(scope.row)" :index="scope.$index"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else :key="item.prop || item.key" v-bind="item"> </el-table-column>
      </template>
      <template slot="empty">
        <div v-show="!(!!loading || dataLoading)" class="my-10">
          <!-- TODO 求提供无数据图片 -->
          <!-- <img class="mx-auto" src="@/assets/images/table-empty.png" /> -->
          <div class="text-center !leading-8">{{ emptyText }}</div>
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

import { Vue, Prop, Watch, Component, Emit, Ref } from 'vue-property-decorator';
import { RESPONSE_CONFIG } from '@/utils/request';
import { Table } from 'element-ui';
import { pick } from 'lodash-es';
import { DEF_PAGE_INFO } from '@/constants/config';

/**
 * 封装 ElTable<br/>
 * 与 [TableMixin](#/Mixin/TableMixin) 配合使用
 * @requires ./YkTableButton.vue
 * @see https://element.eleme.cn/#/zh-CN/component/table
 */
@Component({
  inheritAttrs: false,
  components: { YkPagination, YkTablePoptip, YkTableButton },
})
export default class YkTable extends Vue {
  /** 渲染的数据, 会隐藏翻页条，如需翻页请包装成 dataRequest */
  @Prop({ type: Array, required: false, default: () => [] })
  data!: Array<Record<string, any>>;
  /** 渲染数据的请求接口，优先级 > data */
  @Prop({ type: Function, required: false })
  dataRequest?: YkFunction<Promise<{ data: []; total: number }>>;

  /** 渲染的列配置  */
  @Prop({ type: [Array], required: true })
  columns!: Array<ColumnItem<any>>;

  /** 是否自动请求，否的时候需要手动调用 request 方法  */
  @Prop({ type: Boolean, default: true })
  autoRequest!: boolean;

  /** 控制 loading 状态，一般情况不需要手动控制，YkTable 会自动管理  */
  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  /** 每页显示几条数据，**当值为 0 时，不分页**  */
  @Prop({ type: Number, required: false })
  pageSize?: number;

  /** 翻页配置，优先级 > pageSize 的配置   */
  @Prop({ type: [Object], default: () => ({}) })
  pageOptions!: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };

  /** 选择框是单选OR多选 */
  @Prop({
    type: String,
    default: 'multi',
    validator(value: 'single' | 'multi' = 'multi') {
      return ['single', 'multi'].includes(value);
    },
  })
  checkMode!: 'single' | 'multi';

  /** 无数据文案 */
  @Prop({ type: String, default: '暂无数据', required: false })
  emptyText?: string;

  /** 默认选中的数据，不设置就不会显示可选框，支持 `.sync` 修饰符 */
  @Prop({ type: Array, required: false })
  selection?: Array<Record<string, any>>;
  /** 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 */
  @Prop({ type: [Function], required: false })
  selectable!: (row: any, rowIndex: number) => boolean;

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

  // @Prop({ type: Boolean, required: false })
  // disableCheck?: boolean;

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
    const hasMinWidth = this.columns.some((i) => i.minWidth || i.showOverflowTooltip);
    let cols = this.columns.slice(0).map((item) => {
      // 未显示设置宽度时，自动计算宽度
      //   设置 showOverflowTooltip 时配置 minWidth, 否则配置 width
      //   所有列都未设置 minWidth 或者 showOverflowTooltip 时配置 width
      const { label, slot, showOverflowTooltip } = item;
      let { minWidth, width } = item;
      if (!width && !minWidth && label && slot !== 'action') {
        if (showOverflowTooltip || !hasMinWidth) {
          minWidth = label.length * 13 + 20;
        } else {
          width = label.length * 13 + 20;
        }
      }
      return Object.assign({ ...item }, { minWidth, width } as any);
    });
    cols = this.colsWithFixed(cols);
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
    if (this.selection) {
      const selection = columns.find((item) => item.type === 'selection');
      selection && columns.splice(columns.indexOf(selection), 1);
      const data: ColumnItem<any> = {
        width: 38,
        type: 'selection',
        // @ts-ignore: 内部配置
        prop: '_selection',
        // @ts-ignore: 内部配置
        label: '_selection',
        // @ts-ignore: 内部配置
        selectable: this.selectable,
        reserveSelection: this.reserveSelection,
        align: 'center',
        fixed: 'left',
        className: this.checkMode === 'single' ? 'yk-table-check-single' : '',
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

    return columns;
  }

  private get showPagination() {
    return this.pageSize !== 0 && this.dataRequest;
  }

  private plainRow(item: object) {
    if (item === null || typeof item !== 'object') return item;
    item = Object.assign({}, item);
    Object.keys(item).forEach((key) => key.startsWith('_') && Reflect.deleteProperty(item, key));

    return item;
  }

  /** 翻页时是否记忆选中的行 */
  @Prop({ type: Boolean, default: false })
  reserveSelection!: boolean;

  /**
   * 支持 props.selection 的 .sync 修饰符
   * @property {any[]} 选中的列表数据
   */
  @Emit('update:selection')
  onSelectionChange(selection: Array<Record<string, any>>) {
    selection = selection.map(this.plainRow);
    return this.onSelectionCascade(selection, this.selection);
  }

  private getList(params: YkFunction<Promise<any>> | Record<string, any>) {
    if (this.dataRequest) {
      return this.dataRequest(params);
    } else {
      return Promise.resolve({ data: this.data });
    }
  }

  /**
   * 手动渲染表格的方法
   * @param {Record<string, any>} params 调用 dataRequest 的条件参数
   * @param {{pageSize:number;pageIndex:number}} pageInfo 调用 dataRequest 的翻页参数
   * @public
   */
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
        const { data = [] } = res;
        if (this.showPagination) {
          this.pageInfo.total = res[RESPONSE_CONFIG.TOTAL] ?? 0;
          this.pageInfo.pageIndex = params?.pageNum || 0;
          this.pageInfo.pageSize = params?.pageSize || 0;
        }
        this.dataList = data;
        !this.reserveSelection && this.onSelectionChange([]);

        /**
         * 返回属性 dataRequest 的请求结果
         * @property {any[]} 列表数据
         */
        this.$emit('on-success', data);
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
.yk-table-poptip,
.ivu-poptip {
  & + & {
    .yk-table .action-bar & {
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
.yk-table {
  .no-data {
    line-height: 3em;

    text-align: center;
  }

  ::v-deep {
    th.yk-table-check-single {
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
