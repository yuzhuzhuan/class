<template>
  <div class="app-container">
    <div class="flex h-full">
      <yk-card flex class="mr-3 w-110" :header="$ts('role.title')">
        <div class="gap-4 yk-flex-col">
          <div>
            <el-button
              type="primary"
              @click="
                () => {
                  roleFlag = true;
                  roleId = 0;
                }
              "
              >{{ $ts('role.addRole') }}</el-button
            >
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
      <yk-card flex class="flex-1">
        <div slot="header" class="flex justify-between">
          <span class="inline-block">{{ $ts('role.editRole') }}</span>
          <span v-if="roleFlag">
            <span class="text-[#FF0000]">*</span>
            <span class="text-[#999999]">{{ $ts('role.required') }}</span>
          </span>
        </div>

        <detail
          v-if="roleFlag"
          :role-id="roleId"
          @done="
            () => {
              roleFlag = false;
              onQueryM();
            }
          "
        ></detail>
        <div v-else class="gap-2 yk-flex-col h-full items-center justify-center">
          <yk-icon icon="ri:file-copy-2-line" class="text-8xl"></yk-icon>
          <p class="text-[#676a6e]">还未选择角色</p>
          <p class="text-[#aeaeaa]">请选中左侧列表，查看角色详情</p>
        </div>
      </yk-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/plugins/mixins';
import { UserModule } from '@/store/modules/user';
import detail from './detail.vue';
import service from '@/services/role';

interface Role {
  name: string;
  actions: string;
}
@Component({ components: { detail } })
export default class PageRole extends Mixins(MixinTable) {
  title = '角色管理';
  ConfirmFlag = false;
  roleFlag = false;
  roleId = '' as any;
  roleEdit(row: any) {
    this.roleId = row.id;
    this.roleFlag = true;
    console.log('row', this.roleId);
  }

  async remove(...rest: any[]) {
    return Reflect.apply(this.removeM, this, [
      ...rest,
      {
        message: this.$ts('role.message'),
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
  removeRequestM = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<Role>> = [
      { label: this.$ts('role.roleName'), prop: 'name' },
      {
        slot: 'action',
        prop: 'action',
        width: 200,
        label: this.$ts('table.actions'),
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
