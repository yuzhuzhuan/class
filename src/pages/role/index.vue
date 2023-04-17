<template>
  <div class="app-container">
    <el-card class="h-full overflow-auto" header="角色管理">
      <div class="h-150">
        <el-button type="primary" @click="$router.push('/role/create')">新增角色</el-button>
        <div class="flex flex-col h-full mt-5">
          <div class="flex-1 min-h-0">
            <YkTable
              ref="table"
              :columns="tableColumns"
              :data-request="tableRequest"
              height="100%"
              class="h-full"
            >
            </YkTable>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/utils/mixins';
import { UserModule } from '@/store/modules/user';

import service from '@/api/role';

interface Role {
  name: string;
  actions: string;
}
@Component({})
export default class PageRole extends Mixins(MixinTable) {
  ConfirmFlag = false;
  roleEdit(row: any) {
    this.$router.push({
      path: `/role/detail/${row.id}`,
    });
  }

  async remove(...rest: any[]) {
    return Reflect.apply(this.removeM, this, [...rest, { message: '是否确定删除角色?' }]);
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
        width: 200,
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

<style lang="scss"></style>
