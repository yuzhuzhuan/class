<template>
  <div class="app-container">
    <yk-card flex :header="$ts('treeTable.title')">
      <div class="yk-flex-col">
        <el-form ref="queryFormM" inline :model="queryFormM">
          <el-form-item>
            <el-button type="primary" @click="dialogEditM.show()">{{
              $ts('table.create')
            }}</el-button>
          </el-form-item>
          <yk-form-item prop="name">
            <yk-input v-model.trim="queryFormM.department" placeholder="请输入部门名称" />
          </yk-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQueryM()">{{ $ts('table.query') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onResetM()">{{ $ts('table.reset') }}</el-button>
          </el-form-item>
        </el-form>
        <div class="yk-flex-col-grow">
          <YkTable ref="table" :columns="tableColumns" :data="list" height="100%" class="h-full">
          </YkTable>
        </div>
        <YkResetable>
          <DialogTreeEdit
            v-model="dialogEditM.visible"
            :data="dialogEditM.data"
            :options="dialogData"
            @done="getList"
          ></DialogTreeEdit>
        </YkResetable>
      </div>
    </yk-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { IDialogData, IList } from './type';
import { MixinTable } from '@/plugins/mixins';
import DialogTreeEdit from './dialog/edit.vue';

import service from '@/services/department';

@Component({ components: { DialogTreeEdit } })
export default class TreeTable extends Mixins(MixinTable) {
  queryFormM = {
    department: '',
  };

  // table
  removeRequestM = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<TreeItem>> = [
      { label: this.$ts('treeTable.departmentName'), prop: 'departmentName', minWidth: 100 },
      { label: this.$ts('treeTable.manager'), prop: 'manager' },
      { label: this.$ts('treeTable.introduce'), prop: 'introduce', showOverflowTooltip: true },
      { label: this.$ts('treeTable.email'), prop: 'email' },
      { label: this.$ts('treeTable.createTime'), prop: 'createTime', width: 160 },
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
