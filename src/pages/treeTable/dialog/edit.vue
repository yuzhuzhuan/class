<template>
  <YkDialog
    v-bind="attrsM"
    :title="$t('treeTable.edit')"
    width="1000px"
    v-on="listenersM"
    @close="$reset('dialogForm')"
  >
    <template #icon>
      <i class="text-2xl dw-title-ic iconfont icon-bianji"></i>
    </template>
    <el-form
      ref="dialogForm"
      inline
      :model="dialogForm"
      :label-width="5 + 2 + 'em'"
      class="max-w-full auto-rows-auto grid gap-0 grid-cols-[2fr_2fr]"
    >
      <yk-form-item
        :label="$t('treeTable.departmentName')"
        prop="departmentName"
        required
        :rules="rules.departmentName"
      >
        <yk-input v-model.trim="dialogForm.departmentName" />
      </yk-form-item>
      <yk-form-item :label="$t('treeTable.manager')" prop="manager" required>
        <yk-input v-model.trim="dialogForm.manager" />
      </yk-form-item>
      <yk-form-item :label="$t('treeTable.location')" :rules="rules.location" required class="w-50">
        <TreeSelect
          v-model="dialogForm.pid"
          :options="options"
          placeholder="请输入部门位置..."
        ></TreeSelect>
      </yk-form-item>
      <yk-form-item
        :label="$t('treeTable.introduce')"
        prop="introduce"
        required
        :rules="rules.introduce"
      >
        <yk-input v-model.trim="dialogForm.introduce" />
      </yk-form-item>
      <yk-form-item :label="$t('treeTable.email')" prop="email" required :rules="rules.email">
        <yk-input v-model.trim="dialogForm.email" />
      </yk-form-item>
    </el-form>
  </YkDialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { MixinDialog } from '@/utils/mixins';
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

  dialogForm = {
    manager: '',
    departmentName: '',
    introduce: '',
    email: '',
    createTime: '',
    pid: null,
    id: '',
  };

  @Prop({}) options!: []; // 部门位置数据

  spOpts = {};
  detailRequestM = service.detail;

  async open() {
    if (this.data?.id) {
      const data = await this.getDetailM(+this.data.id);
      Object.assign(this.dialogForm, data);
    }
  }

  async save() {
    const formData = await this.getFormDataM<DialogUserEdit['dialogForm']>();
    let data = '' as any;
    if (this.data?.id) {
      data = await service.update(formData);
    } else {
      formData.id = Mock.mock('@id');
      formData.createTime = moment().format('YYYY-MM-DD');
      data = await service.create(formData);
    }
    return data;
  }
}
</script>
