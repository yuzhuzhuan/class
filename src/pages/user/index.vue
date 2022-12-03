<template>
  <div class="app-container">
    <div class="flex flex-col h-full">
      <el-form inline :model="queryForm" ref="queryForm">
        <yk-form-item label="用户名称" prop="name">
          <yk-form-input v-model.trim="queryForm.name" />
        </yk-form-item>
        <el-form-item>
          <el-button @click="onQueryM()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogEditM.show()">新增</el-button>
        </el-form-item>
      </el-form>
      <div class="flex-1 min-h-0">
        <YkTable ref="table" :columns="tableColumns" :list="tableRequest" height="100%" class="h-full"> </YkTable>
      </div>
      <DialogUserEdit :data="dialogEditM.data" v-model="dialogEditM.visible" @done="onQueryM()"></DialogUserEdit>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YK_Table/index.vue';
import DialogUserEdit from './dialog/edit.vue';

// import service from '@/api/user';
import service from '../../../api/user';

@Component({ components: { DialogUserEdit } })
export default class PageUser extends Mixins(MixinTable) {
  queryForm = {
    name: ''
  };

  // table
  tableRequest = service.query;
  removeRequest = service.remove;
  get tableColumns() {
    const data: ColumnItem<UserItem>[] = [
      { label: '用户名', prop: 'username' },
      { label: '用户姓名', prop: 'name' },
      { label: '用户类型', prop: 'usertype' },
      { label: '状态', prop: 'enable' },
      {
        slot: 'action',
        fixed: 'right',
        // width: 150,
        listeners: {
          remove: this.removeM,
          edit: this.dialogEditM.show
        }
      }
    ];
    return data;
  }
}
</script>

<style scoped lang="scss"></style>
