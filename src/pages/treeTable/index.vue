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
        <YkTable ref="table" :columns="tableColumns" :list="list" height="100%" class="h-full">
          <!-- <template #actions="scope">
            <div class="actions">
              <YkTableButton text="修改" @click="dialogEditM.show(scope.row)" />
              <YkTableButton text="删除" @click="remove(scope.row)" />
            </div>
          </template> -->
        </YkTable>
      </div>
      <DialogUserEdit
        :data="dialogEditM.data"
        v-model="dialogEditM.visible"
        @done="getList"
        :options="dialogData"
      ></DialogUserEdit>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IDialogData, IList } from './type';
import { MixinDialog, MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YK_Table/index.vue';
import DialogUserEdit from './dialog/edit.vue';

import service from '@/api/department';

@Component({ components: { DialogUserEdit } })
export default class TreeTable extends Mixins(MixinDialog, MixinTable) {
  queryForm = {
    name: '',
  };

  // table
  removeRequest = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<TreeItem>> = [
      { label: '部门名称', prop: 'departmentName' },
      { label: '主管名称', prop: 'manager' },
      { label: '部门介绍', prop: 'introduce' },
      { label: '部门邮箱', prop: 'email' },
      { label: '成立时间', prop: 'createTime' },
      {
        slot: 'action',
        prop: 'action',
        label: '操作',
        listeners: {
          remove: this.removeM,
          edit: this.dialogEditM.show,
        },
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
  // 获取数据
  created() {
    this.getList();
  }

  // 获取数据
  async getList() {
    const { data } = await service.query();

    //  栏目列表信息
    this.dialogData = [
      {
        id: 0,
        label: '顶级栏目',
        pid: 0,
      },
    ];
    if (data) {
      data.forEach((item: IList) => {
        item.label = item.departmentName;
        if (item.children) {
          item.children.forEach((child: IList) => {
            child.label = child.departmentName;
          });
        }
      });
      this.list = data;
      //  栏目列表信息
      this.dialogData = [
        {
          id: 0,
          label: '顶级部门',
          children: [...this.list],
          pid: 0,
        },
      ];
    }
  }

  remove(row = {} as any) {
    this.$confirm('确定要删除该项吗？', '提示').then(async () => {
      await service.remove({ id: row.id });
      this.getList();
      this.$message.success('删除成功!');
    });
  }
}
</script>

<style lang="scss" scoped></style>
