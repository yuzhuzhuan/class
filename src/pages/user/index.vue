<template>
  <div class="app-container">
    <yk-card flex header="用户管理">
      <div class="yk-flex-col">
        <el-form ref="queryFormM" inline :model="queryFormM">
          <el-form-item>
            <el-button type="primary" @click="dialogEditM.show()">新增</el-button>
          </el-form-item>
          <yk-form-item prop="name">
            <yk-form-input v-model.trim="queryFormM.name" placeholder="请输入用户名称" />
          </yk-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQueryM()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onResetM">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="yk-flex-col-grow">
          <YkTable
            ref="table"
            :columns="tableColumns"
            :data-request="tableRequest"
            :page-options="pageInfo"
            height="100%"
            class="h-full"
          >
          </YkTable>
        </div>
        <DialogUserEdit
          v-model="dialogEditM.visible"
          :data="dialogEditM.data"
          @done="onQueryM()"
        ></DialogUserEdit>
      </div>
    </yk-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import DialogUserEdit from './dialog/edit.vue';
import service from '@/api/user';

@Component({ components: { DialogUserEdit } })
export default class PageUser extends Mixins(MixinTable) {
  queryFormM = {
    name: '',
  };
  pageInfo = {
    pageSize: 40,
    pageNum: 1,
  };
  // table
  tableRequest = service.query;
  removeRequest = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<UserItem>> = [
      { label: '用户名', prop: 'username', width: 150 },
      { label: '用户姓名', prop: 'name' },
      { label: '用户类型', prop: 'usertype' },
      { label: '状态', prop: 'enable' },
      {
        slot: 'action',
        prop: 'action',
        fixed: 'right',
        // width: 150,
        listeners: {
          remove: this.remove,
          edit: this.dialogEditM.show,
        },
      },
    ];
    return data;
  }
  async remove(...rest: any[]) {
    return Reflect.apply(this.removeM, this, [
      ...rest,
      {
        message: '是否确定删除用户?',
        descriptions: '仅删除用户本系统内账号，不影响第三方账号',
      },
    ]);
  }
}
</script>

<style lang="scss"></style>
