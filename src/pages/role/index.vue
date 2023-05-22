<template>
  <div class="app-container">
    <yk-card flex :header="$t('role.title')">
      <div class="gap-4 yk-flex-col">
        <div>
          <el-button type="primary" @click="$router.push('/role/create')">{{
            $t('role.addRole')
          }}</el-button>
        </div>
        <div class="yk-flex-col-grow">
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
    </yk-card>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/plugins/mixins';
import { UserModule } from '@/store/modules/user';

import service from '@/api/role';

interface Role {
  name: string;
  actions: string;
}
@Component({})
export default class PageRole extends Mixins(MixinTable) {
  title = '角色管理';
  ConfirmFlag = false;
  roleEdit(row: any) {
    this.$router.push({
      path: `/role/detail/${row.id}`,
    });
  }

  async remove(...rest: any[]) {
    return Reflect.apply(this.removeM, this, [
      ...rest,
      {
        message: this.$t('role.message'),
      },
    ]);
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
      { label: this.$t('role.roleName'), prop: 'name' },
      {
        slot: 'action',
        prop: 'action',
        width: 200,
        label: this.$t('table.actions'),
        listeners: {
          remove: this.remove,
          edit: this.roleEdit,
        },
      },
    ];
    return data;
  }
}
</script>

<style lang="scss"></style>
