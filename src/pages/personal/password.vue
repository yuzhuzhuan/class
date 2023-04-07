<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-form
        ref="submitForm"
        label-position="right"
        :model="submitForm"
        status-icon
        style="width: 600px"
        :rules="rules"
        label-width="80px"
        hide-required-asterisk
      >
        <el-form-item label="旧密码" prop="password">
          <el-input v-model.trim="submitForm.password" type="password" placeholder="请输入旧密码">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model.trim="submitForm.newPassword"
            type="password"
            placeholder="请输入新密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPasswordAgain">
          <el-input
            v-model.trim="submitForm.newPasswordAgain"
            type="password"
            placeholder="请再次输入新密码"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import api from './service';
import { Form } from 'element-ui';
import { FormValidator } from '@/utils/formValidator';

@Component({ components: {} })
export default class PersonalPassword extends Vue {
  @Ref('submitForm') readonly $submitForm!: Form;
  submitForm = { password: '', newPassword: '', newPasswordAgain: '' };

  get rules() {
    return {
      password: FormValidator.checkStringLength(0, 15, '旧密码', true, 'blur'),
      newPassword: FormValidator.checkStringLength(0, 15, '新密码', true, 'blur'),
      newPasswordAgain: [
        { required: true, message: '请再次输入新密码', trigger: 'input' },
        {
          validator: (rule: any, value: string, callback: Function) => {
            if (value !== this.submitForm.newPassword) {
              callback(new Error(rule.message));
            } else {
              callback();
            }
          },
          message: '两次新密码输入不一致',
          trigger: 'blur',
        },
      ],
    };
  }

  save() {
    this.$submitForm.validate(async (result: any) => {
      if (result) {
        const { newPasswordAgain, ...formData } = this.submitForm;
        await api.password(formData);
        this.$router.back();
      }
    });
  }

  cancel() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
