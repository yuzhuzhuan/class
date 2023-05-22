<template>
  <div class="app-container">
    <yk-card flex :header="$t('dragTable.title')">
      <div class="yk-flex-col">
        <el-form ref="queryFormM" inline :model="queryFormM">
          <yk-form-item prop="name">
            <yk-input v-model="queryFormM.name" placeholder="请输入用户名称" />
          </yk-form-item>
          <el-form-item>
            <yk-cascader
              :get-area-info="areaInfo"
              :level="2"
              placeholder="请选择省市"
              clearable
              @change="cascaderChange"
            ></yk-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery()">{{ $t('table.query') }}</el-button>
          </el-form-item>
        </el-form>
        <div class="yk-flex-col-grow">
          <YkTable
            ref="table"
            :columns="tableColumns"
            :data="list"
            :loading="loading"
            :column-style="columnStyle"
            height="100%"
            class="h-full"
          >
            <template #actions>
              <div class="actions move">
                <yk-icon icon="ph:list-bold" class="mr-1"></yk-icon>
              </div>
            </template>
          </YkTable>
        </div>
      </div>
    </yk-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import service from '@/api/sort';
import Sortable from 'sortablejs';
import api from '@/api/area';
import YkCascader from '@/components/YkCascader/index.vue';

@Component({ components: { YkCascader } })
export default class TreeTable extends Mixins(MixinTable) {
  queryFormM = {
    name: '',
    address: '',
  };
  params = {
    pageIndex: 1,
    pageSize: 10,
  };
  /**
   * 部门名称
   */
  dialogData = [] as IDialogData[];

  /**
   * 表格数据
   */
  list = [] as IList[];
  sortList = {
    id: '',
    sort: '',
  } as any;

  loading = false;
  areaInfo = api.query;
  currentData = [] as any;
  cascaderChange(value: any) {
    console.log('value', value[1]);
    this.queryFormM.address = value[1];
  }

  // 处理树形
  changTree(data: any) {
    data.map((item: any) => {
      if (item.children == null) {
        delete item.children;
        item.label = item.name;
        // NOTE 使用mock时的value用name，实际接口需替换成接口所需的属性
        item.value = item.name;
      }
      if (item.children) {
        this.changTree(item.children);
        item.label = item.name;
        // NOTE 使用mock时的value用name，实际接口需替换成接口所需的属性
        item.value = item.name;
      }
      return item;
    });
    return data;
  }
  columnStyle(event: any) {
    if (this.currentData.length === 1 && event.row.id === this.currentData[0].id) {
      let bdWidth = '';
      if (event.columnIndex === 0) {
        bdWidth = '1px 0px 1px 1px';
      } else if (event.columnIndex === 5) {
        bdWidth = '1px 1px 1px 0px';
      } else {
        bdWidth = '1px 0px';
      }
      return {
        'border-color': '#888fe7',
        'border-style': 'solid',
        'border-width': bdWidth,
      };
    } else {
      return {
        'border-bottom': '1px solid #dfe6ec',
      };
    }
  }
  // table
  tableRequest = service.query;
  get tableColumns() {
    const data: Array<ColumnItem<SortItem>> = [
      { label: this.$t('dragTable.index'), type: 'index', prop: 'index', width: 70 },
      { label: this.$t('dragTable.name'), prop: 'name' },
      { label: this.$t('dragTable.phone'), prop: 'phone', minWidth: 120 },
      { label: this.$t('dragTable.email'), prop: 'email', minWidth: 200 },
      { label: this.$t('dragTable.address'), prop: 'address', minWidth: 120, tooltip: true },
      {
        slot: 'actions',
        prop: 'actions',
        label: this.$t('table.actions'),
      },
    ];
    return data;
  }

  async getList() {
    this.loading = true;
    const { data } = await service.query(this.queryFormM);
    this.list = data;
    this.loading = false;
  }
  async onQuery() {
    this.loading = true;
    const { data } = await service.query(this.queryFormM);
    this.currentData = data;
    this.loading = false;
  }

  // 创建sortable实例
  initSortable() {
    const ele = document.querySelector('.el-table__body > tbody') as HTMLElement;
    // 创建拖拽实例
    Sortable.create(ele, {
      animation: 150, // 动画
      disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
      handle: '.move', // 指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
      filter: '.disabled', // 指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
      dragClass: 'dragClass', // 设置拖拽样式类名
      ghostClass: 'ghostClass', // 设置拖拽停靠样式类名
      chosenClass: 'chosenClass', // 设置选中样式类名
      setData(dataTransfer) {
        // to avoid Firefox bug 拖拽打开新页面
        dataTransfer.setData('Text', '');
      },
      onEnd: async (event: any) => {
        const targetRow = this.list.splice(event.oldIndex, 1)[0]; // 拖拽后的行
        this.list.splice(event.newIndex, 0, targetRow); // 得到拖拽后的数组
        const sortData = this.list.map((item, index) => {
          return {
            id: item.id,
            sort: index + 1,
          };
        });
        const { data } = await service.updateSort(sortData);

        if (data === '操作成功') {
          this.getList();
        }
      },
    });
  }

  mounted() {
    this.initSortable();
  }

  activated() {
    this.getList();
  }
}
</script>

<style lang="scss"></style>
