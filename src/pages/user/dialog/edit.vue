<template>
  <YkDialog
    v-bind="attrsM"
    :title="$ts('user.editUser')"
    ok-text="保存"
    width="1000px"
    v-on="listenersM"
  >
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
      <!-- (0-9，a-z(a-z)) -->
      <yk-form-item :label="$ts('user.userName')" prop="username" required :rules="rules.username">
        <yk-input v-model.trim="dialogFormM.username" />
      </yk-form-item>
      <yk-form-item :label="$ts('user.name')" prop="name" required>
        <yk-input v-model.trim="dialogFormM.name" />
      </yk-form-item>
      <!-- (0-9，a-z(a-z)) -->
      <yk-form-item :label="$ts('user.password')" prop="password" required :rules="rules.password">
        <yk-input v-model.trim="dialogFormM.password" type="password" />
      </yk-form-item>
      <yk-form-item :label="$ts('user.usertype')" prop="usertype" required rule-type="number">
        <yk-select
          v-model.trim="dialogFormM.usertype"
          :options="ykOpts.roletypeOpts"
          class="w-[11.25rem]"
        />
      </yk-form-item>
      <!-- (0-停用/1-启用) -->
      <yk-form-item :label="$ts('user.enable')" prop="enable" required rule-type="number">
        <yk-select
          v-model.trim="dialogFormM.enable"
          :options="ykOpts.enableOpts"
          class="w-[11.25rem]"
        />
      </yk-form-item>
    </el-form>
  </YkDialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MixinDialog } from '@/plugins/mixins';
import service from '@/services/user';

@Component({})
export default class DialogUserEdit extends Mixins<MixinDialog<UserItem>>(MixinDialog) {
  rules = {
    username: [{ pattern: /^[0-9a-zA-Z]+$/, message: '请输入0-9a-zA-Z的字符' }],
    password: [{ pattern: /^[0-9a-zA-Z]+$/, message: '请输入0-9a-zA-Z的字符' }],
  };

  dialogFormM = {
    username: '',
    name: '',
    password: '',
    enable: 1,
    usertype: 1,
  };

  detailRequestM = service.detail;
  async saveM() {
    const formData = await this.getFormDataM<DialogUserEdit['dialogFormM']>();
    let res = null;
    if (this.dataM?.id) {
      res = await service.update(formData);
    } else {
      res = await service.create(formData);
    }
    return res.data;
  }
}
</script>
