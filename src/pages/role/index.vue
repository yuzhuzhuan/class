<template>
  <div class="app-container">
    <div class="h-150">
      <el-button @click="$router.push('/role/create')">新增角色</el-button>
      <div class="flex flex-col h-full mt-5">
        <div class="flex-1 min-h-0">
          <YkTable ref="table" :columns="tableColumns" :list="tableRequest" height="100%" class="h-full">
            <template #actions="scope">
              <div class="actions">
                <YkTableButton text="修改" @click="roleEdit(scope.row.id)" v-if="permission('更新角色')" />
                <YkTableButton text="删除" @click="remove(scope.row)" v-if="permission('删除角色')" />
              </div>
            </template>
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

import service, { delRoleApi } from '../../../api/role';
type Role = {
  name: string;
  actions: string;
};
@Component({})
export default class PageRole extends Mixins(MixinTable) {
  tableRequest = service.query;
  removeRequest = service.remove;
  get tableColumns() {
    const data: ColumnItem<Role>[] = [
      { label: '角色名称', prop: 'name' },
      {
        slot: 'actions',
        prop: 'actions',
        label: '操作'
      }
    ];
    return data;
  }

  roleEdit(id: number) {
    this.$router.push({
      path: `${id}`
    });
  }

  remove(row = {} as any) {
    this.$confirm('确定要删除该角色吗？', '提示').then(async () => {
      await delRoleApi({ id: row.id });
      this.onQueryM();
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    });
  }

  /**
   * 获取权限路由
   */
  get permission() {
    return UserModule.permission;
  }

  activated() {
    this.onQueryM();
  }
}
</script>
