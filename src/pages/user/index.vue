<template>
  <div class="app-container">
    <el-card class="h-full overflow-y-auto" header="用户管理">
      <div class="flex flex-col h-150">
        <el-form ref="queryForm" inline :model="queryForm">
          <el-form-item>
            <el-button type="primary" @click="dialogEditM.show()">新增</el-button>
          </el-form-item>
          <yk-form-item prop="name">
            <yk-form-input v-model.trim="queryForm.name" placeholder="请输入用户名称" />
          </yk-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQueryM()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onResetM(pageInfo)">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="flex-1 min-h-0">
          <YkTable
            ref="table"
            :columns="tableColumns"
            :list="tableRequest"
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
      <ConfirmDialog
        :dialog-flag="ConfirmFlag"
        content="是否确定删除用户?"
        details="仅删除用户本系统内账号，不影响第三方账号"
        @close="ConfirmFlag = false"
        @confirmDone="confirmDone"
      ></ConfirmDialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YkTable/index.vue';
import DialogUserEdit from './dialog/edit.vue';
import service from '@/api/user';

@Component({ components: { DialogUserEdit } })
export default class PageUser extends Mixins(MixinTable) {
  queryForm = {
    name: '',
  };
  pageInfo = {
    pageSize: 40,
    pageNum: 1,
  };
  ConfirmFlag = false;
  params = {} as any;
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
  async remove(row: any, pageInfo: any, list: any) {
    this.params = { row, pageInfo, list };
    this.ConfirmFlag = true;
  }
  async confirmDone() {
    const page = { ...this.params.pageInfo };
    const { data } = await service.remove({ id: this.params.row.id });
    if (data === '操作成功') {
      if (page.pageIndex > 1 && this.params.list.length <= 1) {
        page.pageIndex--;
      }
      this.ConfirmFlag = false;
      this.onResetM(page);
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
    }
  }
}
</script>

<style lang="scss">
.el-message-box__content {
  padding: 30px 20px;
  .el-message-box__message {
    div > p:first-child {
      font-weight: 600;
      font-size: 16px;
    }
  }
}
.el-message-box__header {
  font-weight: 600;
  background-color: #f9f9f9;
  border-bottom-color: #ebebeb;
  border-bottom-width: 1px;
  border-radius: 10px 10px 0 0;

  .el-message-box__title {
    font-size: 16px;
  }
}
.el-message-box__btns {
  border-top-color: #ebebeb;
  border-top-width: 1px;
}
</style>
