<template>
  <div class="flex flex-col h-full w-full login-container relative select-none">
    <div
      class="bg-center bg-no-repeat bg-auto cursor-pointer flex flex-1 pr-60 login-body justify-end items-center select-none"
    >
      <div class="flex flex-col text-center justify-center items-center">
        <div class="flex items-center">
          <img src="../../assets/logo.png" alt="" class="mr-5 w-35" />
          <h1 class="my-8 text-[#fff] text-3xl">{{ $t('login.title') }}</h1>
          <lang-select class="text-[#fff] ml-3"></lang-select>
        </div>

        <div
          class="bg-white flex flex-col rounded-2xl min-w-96 min-h-120 pt-13 pb-5 relative justify-center"
        >
          <div class="rounded-2xl h-20 top-1 right-1 w-80 absolute overflow-hidden">
            <div class="h-0 top-0 right-0 w-0 z-index-2 absolute">
              <div class="h-full switch-login-mode relative">
                <div
                  class="bg-[#888fe7] switch-login-mode-box"
                  @click="changeIcon"
                  @mouseenter="seen = true"
                  @mouseleave="seen = false"
                >
                  <YkIcon
                    :icon="icon"
                    class="text-[#fff] -bottom-3 left-8 switch-icon absolute"
                  ></YkIcon>
                </div>
              </div>
            </div>
          </div>
          <div v-show="seen" class="tooltip-content">
            {{ loginTip.includes('扫码') ? $t('login.scanLogIn') : $t('login.passwordLogIn') }}
          </div>
          <div v-show="isqrcode" class="flex flex-col justify-center items-center">
            <h2 class="font-600 text-2xl">{{ $t('login.scanLogIn') }}</h2>
            <p class="mt-4 text-base text-[#ababab] mb-4">{{ $t('login.logInDesc') }}</p>
            <div id="login_container" class="rounded-2xl"></div>
          </div>
          <div v-if="!isqrcode" class="divide-y px-12">
            <div class="flex flex-col pb-5">
              <h2 class="font-600 mb-11 text-2xl">{{ $t('login.passwordLogIn') }}</h2>
              <el-form
                ref="loginFormRef"
                :label-position="`right`"
                :model="loginFormData"
                status-icon
              >
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
                    size="mini"
                    @click="login"
                    >{{ $t('login.logIn') }}</el-button
                  >
                </el-form-item>
                <div class="flex justify-end items-center">
                  <div>
                    <el-checkbox v-model="checked" @change="change"></el-checkbox>
                    <span class="ml-3">{{ $t('login.remember') }}</span>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="flex pt-5 text-[#999] justify-between items-center">
              <div class="text-sm">{{ $t('login.thirdparty') }}</div>
              <a class="cursor-pointer rounded-1/2 h-10 ml-2 w-10 inline-block sign" :href="fs_url">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import LangSelect from '@c/YkLangSelect/index.vue';
import { LoginForm } from './type';
import { FormValidator } from '@/utils/formValidator';
import { UserModule } from '@/store/modules/user';
import { Form } from 'element-ui/types';
import { LoginApi, GetUserApi } from '@/api/login'; // 导入接口
import watermark from '@/utils/watermark';
import Cookies from 'js-cookie';

declare const window: any;
@Component({
  components: {
    LangSelect,
  },
})
export default class PageLogin extends Vue {
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
  isqrcode = false;
  loginTip = '扫码登录';
  icon = 'material-symbols:qr-code-2';
  changeIcon() {
    if (this.isqrcode) {
      this.isqrcode = false;
      this.loginTip = '扫码登录';
      this.icon = 'material-symbols:qr-code-2';
    } else {
      this.isqrcode = true;
      this.loginTip = '密码登录';
      this.icon = 'mi:computer';
    }
  }
  /**
   * 表单的ref
   */
  @Ref() readonly loginFormRef!: Form;
  /**
   * 刷新验证组件的key
   */
  loginValidateKey: string = Date.now().toString();
  get redirect(): string | any {
    return this.$route.query.redirect ? this.$route.query.redirect : '/';
  }
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
        const res = await GetUserApi();
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
    if (Cookies.get('UserInfo')!) {
      this.userInfo = JSON.parse(Cookies.get('UserInfo')!);
    }

    if (Cookies.get('status') === 'true') {
      this.checked = true;
    }
    if (this.checked && this.userInfo) {
      this.loginFormData.username = this.userInfo.username;
      this.loginFormData.password = this.userInfo.password;
    }
  }
  /**
   * 飞书扫码登录
   * 需要在飞书开放平台配置client_id和redirect_uri
   * 应用状态为已启用，二维码才会生效
   * 目前是用测试cs123 企业新建应用模板应用
   */
  seen = false;
  QRLoginObj = '' as any; // 是否生成了二维码
  client_id = `cli_a4b67c3d6439900e`;
  redirect_uri = `http%3A%2F%2Flocalhost%3A10003%2F%23%2Findex`; // 重定向地址
  fs_url = '';

  handleFsLogin() {
    if (this.QRLoginObj !== '') return false; // 避免重複點擊
    this.fs_url = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`;
    this.QRLoginObj = window.QRLogin({
      id: 'login_container',
      goto: this.fs_url,
      width: '360',
      height: '360',
      style: 'width:260px;height:260px;border:none', // 可选的，二维码html标签的style属性
    });
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', this.handleMessage, false);
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', this.handleMessage);
    }
  }

  handleMessage() {
    const { origin } = window.event;
    if (this.QRLoginObj.matchOrigin(origin)) {
      const loginTmpCode = window.event.data;
      if (loginTmpCode) {
        window.location.href = `${this.fs_url}&tmp_code=${loginTmpCode}`;
      }
    }
  }

  mounted() {
    this.handleFsLogin();
  }

  click() {
    window.location.href = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`;
  }

  activated() {
    watermark.remove();
  }
}
</script>

<style lang="scss" scoped>
.login-body {
  background: url('./../../assets/login/bj.png');
  width: 100%;
  background-size: cover;
}
.switch-login-mode-box {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  -webkit-transform: translate(50px, -50px) rotate(45deg);
  transform: translate(50px, -50px) rotate(45deg);
  cursor: pointer;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  overflow: hidden;
}
.switch-icon {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  font-size: 42px;
}
.tooltip-content {
  display: block;
  position: absolute;
  padding: 0 12px;
  top: 35px;
  right: 80px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  border-radius: 3px;
  background: #888fe7;
  color: #fff;
  opacity: 1;
  font-size: 14px;
  -webkit-transform: translateY(-60%);
  transform: translateY(-60%);
  -webkit-box-shadow: 0 4px 10px 0 var(--shadow-pri-md);
  box-shadow: 0 4px 10px 0 var(--shadow-pri-md);
}
.tooltip-content::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  right: -5px;
  top: 10px;
  background: #888fe7;
  border-right: 5px solid #888fe7;
  border-top: 5px solid #888fe7;
  position: absolute;
  border-left: 5px solid transparent;
  border-bottom: 5px solid transparent;
  -webkit-transform: rotate(45deg) translate(0);
  transform: rotate(45deg) translate(0);
}
.sign {
  background: no-repeat url('./../../assets/login/sign-feishu.png') center;
  background-size: 40px 40px;
  border: 1px solid #f0f0f0;
}
</style>
