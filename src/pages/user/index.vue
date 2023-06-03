<template>
  <div class="app-container">
    <yk-card flex :header="$ts('user.title')">
      <div class="yk-flex-col">
        <el-form ref="queryFormM" inline :model="queryFormM">
          <el-form-item>
            <el-button type="primary" @click="dialogEditM.show()">{{
              $ts('table.create')
            }}</el-button>
          </el-form-item>
          <yk-form-item prop="name">
            <yk-input v-model.trim="queryFormM.name" placeholder="请输入用户名称" />
          </yk-form-item>
          <yk-form-item>
            <el-button type="primary" @click="onQueryM()">
              <yk-icon icon="ep:search" class="mr-1 align-bottom"></yk-icon>
              {{ $ts('table.query') }}
            </el-button>
          </yk-form-item>
          <yk-form-item>
            <el-button @click="onResetM">
              <yk-icon icon="ep:refresh-left" class="mr-1 align-bottom"></yk-icon>
              {{ $ts('table.reset') }}
            </el-button>
          </yk-form-item>
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
        <YkResetable>
          <DialogUserEdit
            v-model="dialogEditM.visible"
            :data="dialogEditM.data"
            @done="onQueryM()"
          ></DialogUserEdit>
        </YkResetable>
      </div>
    </yk-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinTable } from '@/plugins/mixins';
import DialogUserEdit from './dialog/edit.vue';
import service from '@/services/user';

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
  removeRequestM = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<UserItem>> = [
      { label: this.$ts('user.userName'), prop: 'username', width: 150 },
      { label: this.$ts('user.name'), prop: 'name' },
      { label: this.$ts('user.usertype'), prop: 'usertype' },
      { label: this.$ts('user.enable'), prop: 'enable' },
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
        message: this.$ts('user.message'),
        descriptions: this.$ts('user.descriptions'),
      },
    ]);
  }
}
</script>

<style lang="scss"></style>
