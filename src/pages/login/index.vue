<template>
  <div class="flex flex-col h-full w-full login-container relative select-none">
    <div
      class="bg-center bg-no-repeat bg-auto cursor-pointer flex flex-1 login-body justify-center items-center select-none"
    >
      <div class="border border-solid rounded-md shadow-lg py-5 px-7.5 shadow-black-3 w-1/3">
        <el-form ref="loginFormRef" :label-position="`right`" :model="loginFormData" status-icon>
          <el-form-item
            prop="username"
            :rules="FormValidator.checkStringLength(3, 50, '用户名', true, 'blur')"
          >
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="FormValidator.checkStringLength(0, 15, '密码', true, 'blur')"
          >
            <!-- 密码框 -->
            <el-input
              v-model.trim="loginFormData.password"
              prefix-icon="el-icon-lock"
              :type="`${hasOpenEye ? 'text' : 'password'}`"
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="h-11.5 text-xl w-full pb-9"
              type="primary"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
          <div class="flex text-[#ffffff] justify-end items-center">
            <div>
              <el-checkbox v-model="checked" @change="change"></el-checkbox>
              <span class="ml-3">记住我</span>
            </div>
          </div>
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
import { LoginApi, GetUserApi } from '@/api/login'; // 导入接口
import Cookies from 'js-cookie';

@Component({})
export default class Login extends Vue {
  // 登录表单数据
  loginFormData: LoginForm = {
    username: 'admin',
    password: '123456',
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
  checked = false;
  userInfo: any;
  // redirect = '/' as any;
  /**
   * 表单的ref
   */
  @Ref() readonly loginFormRef!: Form;
  /**
   * 刷新验证组件的key
   */
  loginValidateKey: string = Date.now().toString();
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
        this.$router.push(this.redirect);
        this.loading = false;
        Cookies.set('UserInfo', JSON.stringify(this.loginFormData));
      } else {
        this.$message.warning('请输入账户名称和密码');
        this.loginValidateKey = Date.now().toString();
        this.loading = false;
      }
    });
  }
  /**
   * 记住登录
   */
  change(value: boolean) {
    Cookies.set('status', JSON.stringify(value));
  }

  created() {
    this.userInfo = JSON.parse(Cookies.get('UserInfo')!);

    if (Cookies.get('status') === 'true') {
      this.checked = true;
    }
    if (this.checked && this.userInfo) {
      this.loginFormData.username = this.userInfo.username;
      this.loginFormData.password = this.userInfo.password;
    }
  }

  get redirect(): string | any {
    return this.$route.query.redirect ? this.$route.query.redirect : '/';
  }
}
</script>

<style lang="scss" scoped>
.login-body {
  background: url('./../../assets/login/bj.png');
}
</style>
