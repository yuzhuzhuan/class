<template>
  <div class="app-container">
    <el-card class="h-full overflow-y-auto" header="树形数据">
      <div class="flex flex-col h-150">
        <el-form ref="queryForm" inline :model="queryForm">
          <el-form-item>
            <el-button type="primary" @click="dialogEditM.show()">新增</el-button>
          </el-form-item>
          <yk-form-item prop="name">
            <yk-form-input v-model.trim="queryForm.department" placeholder="请输入部门名称" />
          </yk-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQueryM()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset()">重置</el-button>
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
          v-model="dialogEditM.visible"
          :data="dialogEditM.data"
          :options="dialogData"
          @done="getList"
        ></DialogUserEdit>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IDialogData, IList } from './type';
import { MixinDialog, MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YkTable/index.vue';
import DialogUserEdit from './dialog/edit.vue';

import service from '@/api/department';

@Component({ components: { DialogUserEdit } })
export default class TreeTable extends Mixins(MixinDialog, MixinTable) {
  queryForm = {
    department: '',
  };

  onReset(params?: Record<string, any>) {
    this.$refQueryFormM.resetFields();
    const pageInfo = { pageSize: 10, pageNum: 1 };
    return this.$refTableM?.request(Object.assign({}, this.queryForm, params), pageInfo);
  }
  // table
  removeRequest = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<TreeItem>> = [
      { label: '部门名称', prop: 'departmentName', minWidth: 100 },
      { label: '主管名称', prop: 'manager' },
      { label: '部门介绍', prop: 'introduce', tooltip: true },
      { label: '部门邮箱', prop: 'email' },
      { label: '成立时间', prop: 'createTime', width: 160 },
      {
        slot: 'action',
        prop: 'action',
        fixed: 'right',
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
