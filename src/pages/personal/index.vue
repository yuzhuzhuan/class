<template>
  <div class="app-container">
    <el-card class="h-full overflow-y-auto" :header="$ts('personal.title')">
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
        <el-form-item prop="phone" :label="$ts('personal.phone')">
          <el-input v-model.trim="submitForm.phone" placeholder="请输入手机号" clearable disabled />
        </el-form-item>
        <el-form-item prop="nickName" :label="$ts('personal.nickname')">
          <el-input v-model.trim="submitForm.nickName" placeholder="请输入昵称"> </el-input>
        </el-form-item>
        <el-form-item prop="gender" :label="$ts('personal.gender')">
          <el-radio-group v-model="submitForm.gender">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="sysRoleId" :label="$ts('personal.role')">
          <el-select
            v-model="submitForm.sysRoleId"
            disabled
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="item in optionsRole"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="cancel()">{{ $ts('global.cancel') }}</el-button>
        <el-button type="primary" @click="save()">{{ $ts('global.save') }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import api from './service';
// import apiRole from "@/pages/role/service";
import { Form } from 'element-ui';
import { FormValidator } from '@/utils/formValidator';
import { UserModule } from '@/store/modules/user';
import { GetUserApi, updateUser } from '@/services/login';
import Cookies from 'js-cookie';

@Component({ components: {} })
export default class PersonalInfo extends Vue {
  @Ref('submitForm') readonly $submitForm!: Form;
  submitForm: submitForm = {
    id: '',
    phone: '',
    sysRoleId: null,
    password: '',
    nickName: '',
    gender: 0,
    sysRoleHidden: null,
    sysRoleName: '',
  };
  rules = {
    nickName: FormValidator.checkStringLength(2, 8, '昵称', true, 'blur'),
  };

  get userInfo() {
    return UserModule.useData;
  }
  @Watch('userInfo', { immediate: true })
  onUserInfoChange(newValue: any) {
    if (newValue) {
      Object.keys(this.submitForm).forEach((key: string) => {
        this.submitForm[key as keyof submitForm] =
          newValue[key] || this.submitForm[key as keyof submitForm];
      });
      if (this.submitForm.sysRoleHidden === 1) {
        this.optionsRole = [{ id: this.submitForm.sysRoleId, name: this.submitForm.sysRoleName }];
      }
    }
  }
  created() {
    // this.getDetail();
    // this.getRoleList();
  }
  optionsRole = [] as Array<{ id: any; name: string }>;
  // async getRoleList() {
  // const {
  //   data: { data },
  // } = await apiRole.list({});
  // this.optionsRole = data;
  // }

  save() {
    this.$submitForm.validate(async (result: any) => {
      if (result) {
        const { nickName, gender } = this.submitForm;
        await updateUser({ nickName, gender });
        const {
          data: { data },
        } = await GetUserApi();
        UserModule.setUserData(data);
        // if (Cookies.get('path')) {
        //   this.$router.push('/article');
        //   Cookies.remove('path');
        //   return;
        // }
        this.$router.back();
      }
    });
  }

  cancel() {
    if (Cookies.get('path')) {
      this.$router.push('/article');
      Cookies.remove('path');
      return;
    }
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
