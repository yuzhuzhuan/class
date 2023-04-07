<template>
  <div class="app-container">
    <el-card class="h-full font-600 overflow-auto" header="角色管理">
      <div class="h-150">
        <el-button type="primary" @click="$router.push('/role/create')">新增角色</el-button>
        <div class="flex flex-col h-full mt-5">
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
        </div>
      </div>
      <ConfirmDialog
        :dialog-flag="ConfirmFlag"
        content="是否确定删除角色?"
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
import { UserModule } from '@/store/modules/user';

import service from '@/api/role';

interface Role {
  name: string;
  actions: string;
}
@Component({})
export default class PageRole extends Mixins(MixinTable) {
  ConfirmFlag = false;
  params = {} as any;

  roleEdit(row: any) {
    this.$router.push({
      path: `detail/${row.id}`,
    });
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

  /**
   * 获取权限路由
   */
  get permission() {
    return UserModule.permission;
  }

  async activated() {
    // this.onQueryM();
  }
  tableRequest = service.query;
  removeRequest = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<Role>> = [
      { label: '角色名称', prop: 'name' },
      {
        slot: 'action',
        prop: 'action',
        label: '操作',
        listeners: {
          remove: this.remove,
          detail: this.roleEdit,
        },
      },
    ];
    return data;
  }
}
</script>

<style lang="scss">
.el-card__header {
  background-color: #f9f9f9;
}
</style>
