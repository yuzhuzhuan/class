<template>
  <YkDialog v-bind="attrsM" :title="$t('treeTable.edit')" width="1000px" v-on="listenersM">
    <template #icon>
      <i class="text-2xl dw-title-ic iconfont icon-bianji"></i>
    </template>
    <el-form
      ref="dialogFormM"
      inline
      :model="dialogFormM"
      :label-width="5 + 2 + 'em'"
      class="max-w-full auto-rows-auto grid gap-0 grid-cols-[2fr_2fr]"
    >
      <yk-form-item
        :label="$t('treeTable.departmentName').toString()"
        prop="departmentName"
        required
        :rules="rules.departmentName"
      >
        <yk-input v-model.trim="dialogFormM.departmentName" />
      </yk-form-item>
      <yk-form-item :label="$t('treeTable.manager').toString()" prop="manager" required>
        <yk-input v-model.trim="dialogFormM.manager" />
      </yk-form-item>
      <yk-form-item :label="$t('treeTable.location').toString()" :rules="rules.location" required>
        <TreeSelect
          v-model="dialogFormM.pid"
          :options="options"
          placeholder="请输入部门位置..."
        ></TreeSelect>
      </yk-form-item>
      <yk-form-item
        :label="$t('treeTable.introduce').toString()"
        prop="introduce"
        required
        :rules="rules.introduce"
      >
        <yk-input v-model.trim="dialogFormM.introduce" />
      </yk-form-item>
      <yk-form-item
        :label="$t('treeTable.email').toString()"
        prop="email"
        required
        :rules="rules.email"
      >
        <yk-input v-model.trim="dialogFormM.email" />
      </yk-form-item>
    </el-form>
  </YkDialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { MixinDialog } from '@/plugins/mixins';
import TreeSelect from '@riophae/vue-treeselect';
import service from '@/api/department';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import moment from 'moment';
import Mock from 'mockjs';

@Component({
  components: { TreeSelect },
})
export default class DialogUserEdit extends Mixins<MixinDialog<TreeItem>>(MixinDialog) {
  rules = {
    departmentName: [{ message: '请输入部门名称' }],
    manager: [{ message: '请输入主管名称' }],
    introduce: [{ message: '请输入部门介绍' }],
    location: [{ message: '请选择部门位置', trigger: 'blur' }],
    email: [
      { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱格式' },
    ],
  };

  dialogFormM = {
    manager: '',
    departmentName: '',
    introduce: '',
    email: '',
    createTime: '',
    pid: null,
    id: '',
  };

  @Prop({}) options!: []; // 部门位置数据

  detailRequestM = service.detail;

  async openM() {
    if (this.dataM?.id) {
      const data = await this.getDetailM(+this.dataM.id);
      Object.assign(this.dialogFormM, data);
    }
  }

  async saveM() {
    const formData = await this.getFormDataM<DialogUserEdit['dialogFormM']>();
    let res = null;
    if (this.dataM?.id) {
      res = await service.update(formData);
    } else {
      formData.id = Mock.mock('@id');
      formData.createTime = moment().format('YYYY-MM-DD');
      res = await service.create(formData);
    }
    return res.data;
  }
}
</script>
