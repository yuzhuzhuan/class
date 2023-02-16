<template>
  <YkDialog v-bind="attrsM" v-on="listenersM" title="用户编辑" width="1000px" @close="$reset('dialogForm')">
    <template #icon>
      <i class="text-2xl dw-title-ic iconfont icon-bianji"></i>
    </template>
    <el-form
      inline
      ref="dialogForm"
      :model="dialogForm"
      :label-width="5 + 2 + 'em'"
      class="max-w-full auto-rows-auto grid gap-0 grid-cols-[2fr_2fr]"
    >
      <!-- (0-9，a-z(a-z)) -->
      <yk-form-item label="用户登录名" prop="username" required :rules="rules.username">
        <yk-form-input v-model.trim="dialogForm.username" />
      </yk-form-item>
      <yk-form-item label="用户姓名" prop="name" required>
        <yk-form-input v-model.trim="dialogForm.name" />
      </yk-form-item>
      <!-- (0-9，a-z(a-z)) -->
      <yk-form-item label="登录密码" prop="password" required :rules="rules.password">
        <yk-form-input v-model.trim="dialogForm.password" type="password" />
      </yk-form-item>
      <yk-form-item label="用户类别" prop="usertype" required rule-type="number">
        <yk-form-select v-model.trim="dialogForm.usertype" :options="spOpts.roletypeOpts" />
      </yk-form-item>
      <!-- (0-停用/1-启用) -->
      <yk-form-item label="激活状态" prop="enable" required rule-type="number">
        <yk-form-select v-model.trim="dialogForm.enable" :options="spOpts.enableOpts" />
      </yk-form-item>
    </el-form>
  </YkDialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinDialog } from '@/utils/mixins';
import service from '../../../../api/user';
@Component({})
export default class DialogUserEdit extends Mixins<MixinDialog<UserItem>>(MixinDialog) {
  rules = {
    username: [{ pattern: /^[0-9a-zA-Z]+$/, message: '请输入0-9a-zA-Z的字符' }],
    password: [{ pattern: /^[0-9a-zA-Z]+$/, message: '请输入0-9a-zA-Z的字符' }]
  };

  dialogForm = {
    username: '',
    name: '',
    password: '',
    enable: 1,
    usertype: 1
  };

  spOpts = {};
  detailRequestM = service.detail;

  async open() {
    if (this.data?.id) {
      const data = await this.getDetailM(this.data.id);
      Object.assign(this.dialogForm, data);
    }
  }

  async save() {
    const formData = await this.getFormDataM<DialogUserEdit['dialogForm']>();
    let data = '' as any;
    if (this.data?.id) {
      data = await service.update(formData);
    } else {
      data = await service.create(formData);
    }
    return data;
  }
}
</script>
