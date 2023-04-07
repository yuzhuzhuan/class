<template>
  <div class="app-container">
    <div class="flex flex-col h-full">
      <el-form inline :model="queryForm" ref="queryForm">
        <yk-form-item label="用户名称" prop="name">
          <yk-form-input v-model="queryForm.name" />
        </yk-form-item>
        <el-form-item>
          <el-button @click="onQueryM()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogEditM.show()">新增</el-button>
        </el-form-item>
      </el-form>
      <div class="flex-1 min-h-0">
        <YkTable
          ref="table"
          :columns="tableColumns"
          :list="list"
          :loading="loading"
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
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IDialogData, IList } from './type';
import { MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YkTable/index.vue';
import service from '@/api/table';
import Sortable from 'sortablejs';

@Component({ components: {} })
export default class TreeTable extends Mixins(MixinTable) {
  queryForm = {
    name: '',
  };

  // table
  tableRequest = service.query;
  get tableColumns() {
    const data: Array<ColumnItem<UserItem>> = [
      { label: '用户名', prop: 'username' },
      { label: '用户姓名', prop: 'name' },
      { label: '用户类型', prop: 'usertype' },
      { label: '状态', prop: 'enable' },
      {
        slot: 'actions',
        prop: 'actions',
        label: '操作',
      },
    ];
    return data;
  }

  /**
   * 部门名称
   */
  dialogData = [] as IDialogData[];

  /**
   * 表格数据
   */
  list = [] as IList[];

  loading = false;

  async getList() {
    this.loading = true;
    const { data } = await service.query(this.queryForm);
    console.log('data', data);
    this.list = data;
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
      // 开始拖动事件
      onStart: () => {
        // console.log('开始拖动');
      },
      onEnd: (event: any) => {
        const tempTableData = [...this.list]; // 先存一份临时变量表头数据
        let temp = '' as any;
        temp = tempTableData[event.oldIndex]; //
        tempTableData.splice(event.oldIndex, 1);
        tempTableData.splice(event.newIndex, 0, temp);
        this.list = [];
        this.$nextTick(() => {
          this.list = tempTableData.map((item: any, index: any) => {
            item.sort = index + 1;
            return item;
          });
        });
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

<style lang="scss" scoped></style>
