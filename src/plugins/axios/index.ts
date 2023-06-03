import axios, { AxiosResponse } from 'axios';
import { Message } from 'element-ui';
import { UserModule } from '@/store/modules/user';
import router from '@/router';
import { RESPONSE_CONFIG } from '@/constants/config';
import _this from '@/main';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/url' : '', // api的base_url
  withCredentials: true, // 开启跨域身份凭证
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: RESPONSE_CONFIG.TIMEOUT as number, // request timeout
});

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config) => {
    if (UserModule.token.length > 0 && UserModule.token) {
      config.headers[RESPONSE_CONFIG.HEADER_TOKEN] = UserModule.token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

interface ResponseConfig<T = any> {
  [RESPONSE_CONFIG.CODE]: number;
  [RESPONSE_CONFIG.MESSAGE]: string;
  [RESPONSE_CONFIG.DATA]: T;
}
/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response: AxiosResponse<ResponseConfig>) => {
    if (response.data[RESPONSE_CONFIG.CODE] !== RESPONSE_CONFIG.OK) {
      throw Object.assign(new Error(response.data[RESPONSE_CONFIG.MESSAGE]), { response });
    }

    return response.data;
  },
  (error) => {
    Message.error(error.response.data[RESPONSE_CONFIG.MESSAGE]);
    // ! 当前路由不在login时不弹 401 error，避免连续两个接口都 401 时弹两次
    // if (error.response.data.code === 401 && router.currentRoute.name !== 'Login') {
    //   Message.error(error.response.data[RESPONSE_CONFIG.MESSAGE]);
    //   UserModule.deltoken();
    //   router.push(`/login?redirect=${location.href.split('#')[1]}`);
    //   // router.push({ path: '/login' });
    // }

    // 单点登录状态码，token失效状态码
    const errorList = [512, 403];
    if (errorList.includes(error.response.data.code) && router.currentRoute.name !== 'Login') {
      _this.$ykMsgbox
        .confirm('', {
          title: '登出提示',
          message: '账号状态已发生改变',
          descriptions: '请重新登录',
          iconName: 'material-symbols:info-outline-rounded',
          showCancelButton: false, // 不显示取消按钮
        })
        .then(() => {
          UserModule.deltoken();
          _this.$router.push(`/login?redirect=${location.href.split('#')[1]}`);
        })
        .catch(() => {
          UserModule.deltoken();
          _this.$router.push(`/login?redirect=${location.href.split('#')[1]}`);
        });
    } else {
      Message.error(error.response.data[RESPONSE_CONFIG.MESSAGE]);
    }
    return Promise.reject(error);
  },
);

// Response interceptors
// service.interceptors.response.use(
//   response => {
//     return Promise.resolve(response)
//   },
//   error => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       UserModule.ResetToken()
//       location.reload()
//     }
//     if (error.response.data.code == '2000009') {
//       return Promise.reject(error)
//     }
//     var message =
//       (error.response && error.response.data.message) ||
//       (error.message.indexOf('timeout') > -1 ? '请求超时' : error.message)
//     if (
//       navigator.userAgent.match(
//         /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
//       )
//     ) {
//       Message({ message: message, type: 'error' })
//     } else {
//       console.log(error)
//       MessageBox.alert(message, '错误提示', { type: 'error' })
//     }
//     return Promise.reject(error)
//   }
// )

export default request;
