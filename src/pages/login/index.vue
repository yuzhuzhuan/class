<template>
  <div class="login-container">
    <div class="login-body">
      <div class="login-form-container">
        <el-form
          ref="loginFormRef"
          class="form-style"
          :label-position="`right`"
          :model="loginFormData"
          status-icon
        >
          <div class>
            <h2>表单登录</h2>
          </div>
          <el-form-item
            prop="username"
            :rules="
              FormValidator.checkStringLength(3, 50, '用户名', true, 'blur')
            "
          >
            <el-input
              v-model="loginFormData.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item
            class="el-item-style"
            prop="password"
            :rules="
              FormValidator.checkStringLength(0, 15, '密码', true, 'blur')
            "
          >
            <!-- 密码框 -->
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginFormData.password"
              :type="`${hasOpenEye ? 'text' : 'password'}`"
              placeholder="请输入密码"
            >
              <!-- <i
                slot="suffix"
                :class="[hasOpenEye ? 'el-icon-view' : 'iconfont iconeye1']"
                style="font-size: 14px; cursor: pointer"
                @click="hasOpenEye = !hasOpenEye"
              /> -->
            </el-input>
          </el-form-item>
          <el-form-item class="el-item-style">
            <el-button
              :loading="loading"
              style="
                width: 100%;
                height: 46px;
                line-height: 15px;
                font-size: 23px;
              "
              type="primary"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="login-footer">
      <span>©2020 开源技术库 - 中国xxxxx</span>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';
import LoginValidator from '@/components/LoginValidator/index.vue';
import { LoginForm } from './types';
import { FormValidator } from '@/utils/formValidator';
// import { APIGetMenu, ApiLogin } from '@/api/login/index';
// import { AxiosResponse } from 'node_modules/axios';
import { UserModule } from '@/store/modules/user';
import { Form } from 'element-ui/types';
import { LoginApi, GetUserApi } from '../../../api/login'; // 导入接口

@Component({
  name: 'Login',
  components: {
    LoginValidator
  }
})
export default class extends Vue {
  // 登录表单数据
  public loginFormData: LoginForm = {
    username: 'admin',
    password: '123456'
  };

  /**
   * 验证器
   */
  public FormValidator = FormValidator;
  /**
   * 密码框是否睁开眼
   */
  public hasOpenEye = false;
  /**
   * 登录按钮是否需要loding
   */
  public loading = false;
  /**
   * 表单的ref
   */
  @Ref() readonly loginFormRef!: Form;
  /**
   * 验证器的ref
   */
  // @Ref() readonly loginValidatorRef!: LoginValidator;
  /**
   * 刷新验证组件的key
   */
  // public loginValidateKey: string = Date.now().toString();
  /**
   * 登录
   */
  public login () {
    this.loginFormRef.validate(async (valide: boolean) => {
      // this.loading = true;
      console.log(valide);
      if (valide) {
        //  登录获取数据
        const {
          data: { data }
        } = await LoginApi(this.loginFormData);
        UserModule.setToken(data.accessToken);
        const res = await GetUserApi(this.loginFormData)
        UserModule.setUserData(res.data.data);
        // 登录获取数据
        // let resp: AxiosResponse<ILoginRes> = await ApiLogin(this.loginFormData);
        // // 存入token 和 用户data 的数据
        // UserModule.setToken(resp.data.token);
        // UserModule.setUserData(resp.data.data);
        // // 获取用户菜单
        // let menuRes = await APIGetMenu({
        //   phone: resp.data.data.mobile,
        //   comcode: resp.data.data.comcode,
        // });
        // console.log(menuRes);
        this.$router.push('/');
        this.loading = false;
      } else {
        this.$message.warning('请输入账户名称和密码');
        // this.loginValidateKey = Date.now().toString();
        this.loading = false;
      }
    });
  }

  // public getMenu() {}
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
  flex-direction: column;
  .login-header {
    display: flex;
    align-items: center;
    padding-left: 50px;
    cursor: pointer;
  }

  .login-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #322b34;
    font-size: 12px;
  }
  .login-header,
  .login-footer {
    height: 10%;
    background: $subColor;
  }
  .login-body {
    background: url("./../../images/bj.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .login-form-container {
      width: 30%;
      border: 1px solid mix($mainColor, #000, 80);
      box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.3);
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3),
        rgba(0, 0, 0, 0.3)
      );
      padding: 20px 30px;
      border-radius: 5px;
    }
  }
}
</style>
