<template>
  <div class="app-container">
    <div class="flex flex-col h-full">
      <el-form inline :model="queryForm" ref="queryForm">
        <el-form-item>
          <el-button @click="dialogEditM.show()" type="primary">新增</el-button>
        </el-form-item>
        <yk-form-item prop="name">
          <yk-form-input v-model.trim="queryForm.name" placeholder="请输入用户名称" />
        </yk-form-item>
        <el-form-item>
          <el-button @click="onQueryM()" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset()">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="flex-1 min-h-0">
        <YkTable
          ref="table"
          :columns="tableColumns"
          :list="tableRequest"
          height="100%"
          class="h-full"
        >
        </YkTable>
      </div>
      <DialogUserEdit
        :data="dialogEditM.data"
        v-model="dialogEditM.visible"
        @done="onQueryM()"
      ></DialogUserEdit>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YK_Table/index.vue';
import DialogUserEdit from './dialog/edit.vue';
import service from '@/api/user';

@Component({ components: { DialogUserEdit } })
export default class PageUser extends Mixins(MixinTable) {
  queryForm = {
    name: '',
  };

  onReset(params?: Record<string, any>) {
    this.$refQueryFormM.resetFields();
    const pageInfo = { pageSize: 10, pageNum: 1 };
    return this.$refTableM?.request(Object.assign({}, this.queryForm, params), pageInfo);
  }
  // table
  tableRequest = service.query;
  removeRequest = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<UserItem>> = [
      { label: '用户名', prop: 'username' },
      { label: '用户姓名', prop: 'name' },
      { label: '用户类型', prop: 'usertype' },
      { label: '状态', prop: 'enable' },
      {
        slot: 'action',
        prop: 'action',
        fixed: 'right',
        // width: 150,
        listeners: {
          remove: this.removeM,
          edit: this.dialogEditM.show,
        },
      },
    ];
    return data;
  }
}
</script>

<style scoped lang="scss"></style>
