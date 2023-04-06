<template>
  <div class="app-container">
    <div class="h-150">
      <el-button @click="$router.push('/role/create')" type="primary">新增角色</el-button>
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
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import type { ColumnItem } from '@/components/YK_Table/index.vue';
import { UserModule } from '@/store/modules/user';

import service from '@/api/role';

interface Role {
  name: string;
  actions: string;
}
@Component({})
export default class PageRole extends Mixins(MixinTable) {
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
          remove: this.removeM,
          detail: this.roleEdit,
        },
      },
    ];
    return data;
  }

  roleEdit(id: number) {
    this.$router.push({
      path: `${id}`,
    });
  }

  remove(row = {} as any) {
    this.$confirm('确定要删除该角色吗？', '提示').then(async () => {
      await service.remove({ id: row.id });
      this.onQueryM();
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
    });
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
}
</script>
