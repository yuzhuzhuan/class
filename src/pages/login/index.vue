<template>
  <div class="login-container relative h-full w-full flex flex-col select-none">
    <div class="login-body bg-center bg-no-repeat bg-auto flex flex-1 justify-center items-center cursor-pointer select-none">
      <div class="w-1/3 border border-solid shadow-lg shadow-black-3 py-5 px-7.5 rounded-md">
        <el-form ref="loginFormRef" :label-position="`right`" :model="loginFormData" status-icon>
          <el-form-item prop="username" :rules="FormValidator.checkStringLength(3, 50, '用户名', true, 'blur')">
            <el-input v-model.trim="loginFormData.username" placeholder="请输入用户名" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password" :rules="FormValidator.checkStringLength(0, 15, '密码', true, 'blur')">
            <!-- 密码框 -->
            <el-input
              prefix-icon="el-icon-lock"
              v-model.trim="loginFormData.password"
              :type="`${hasOpenEye ? 'text' : 'password'}`"
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="w-full h-11.5 text-xl pb-9" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { LoginForm } from './type';
import { FormValidator } from '@/utils/formValidator';
import { UserModule } from '@/store/modules/user';
import { Form } from 'element-ui/types';
import { LoginApi, GetUserApi } from '../../../api/login'; // 导入接口

@Component({})
export default class Login extends Vue {
  // 登录表单数据
  loginFormData: LoginForm = {
    username: 'admin',
    password: '123456'
  };

  /**
   * 验证器
   */
  FormValidator = FormValidator;
  /**
   * 密码框是否睁开眼
   */
  hasOpenEye = false;
  /**
   * 登录按钮是否需要loding
   */
  loading = false;
  /**
   * 表单的ref
   */
  @Ref() readonly loginFormRef!: Form;
  /**
   * 登录
   */
  login() {
    this.loginFormRef.validate(async (valide: boolean) => {
      this.loading = true;
      if (valide) {
        //  登录获取数据
        const { data } = await LoginApi(this.loginFormData);
        UserModule.setToken(data.accessToken);
        const res = await GetUserApi(this.loginFormData);
        UserModule.setUserData(res.data);
        this.$router.push('/');
        this.loading = false;
      } else {
        this.$message.warning('请输入账户名称和密码');
        this.loading = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.login-body {
  background: url('./../../assets/login/bj.png');
}
</style>
