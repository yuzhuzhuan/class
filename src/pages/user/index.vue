<template>
  <div class="app-container">
    <yk-card flex :header="$t('user.title')">
      <div class="yk-flex-col">
        <el-form ref="queryFormM" inline :model="queryFormM">
          <el-form-item>
            <el-button type="primary" @click="dialogEditM.show()">{{
              $t('table.create')
            }}</el-button>
          </el-form-item>
          <yk-form-item prop="name">
            <yk-input v-model.trim="queryFormM.name" placeholder="请输入用户名称" />
          </yk-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQueryM()">{{ $t('table.query') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onResetM">{{ $t('table.reset') }}</el-button>
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
  removeRequest = service.remove;
  get tableColumns() {
    const data: Array<ColumnItem<UserItem>> = [
      { label: this.$t('user.userName'), prop: 'username', width: 150 },
      { label: this.$t('user.name'), prop: 'name' },
      { label: this.$t('user.usertype'), prop: 'usertype' },
      { label: this.$t('user.enable'), prop: 'enable' },
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
        message: this.$t('user.message'),
        descriptions: this.$t('user.descriptions'),
      },
    ]);
  }
}
</script>

<style lang="scss"></style>
