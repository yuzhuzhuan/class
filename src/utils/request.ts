import axios, { AxiosResponse } from 'axios';
import { Message } from 'element-ui';
import { UserModule } from '@/store/modules/user';
import router from '@/router';
import watermark from '@/utils/watermark';

export enum RESPONSE_CONFIG {
  OK = 200,
  FAIL = 500,
  TIMEOUT = 5000,
  MESSAGE = 'msg',
  CODE = 'code',
  DATA = 'data',
  TOTAL = 'total',
  HEADER_TOKEN = 'accessToken',
  HEADER_LANG = 'Accept-Language',
}

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/url' : '', // api的base_url
  withCredentials: true, // 开启跨域身份凭证
  // method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 5000, // request timeout
  // withCredentials: true // send cookies when cross-domain requests
});

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config) => {
    if (UserModule.token.length > 0 && UserModule.token) {
      config.headers.Authorization = UserModule.token;
    }

    return config;
    // Do something before request is sent
    // const headers = { ...config.headers };
    // if (UserModule.token.length > 0 && UserModule.token) {
    //   headers.Authorization = UserModule.token;
    // }
    // return { ...config, headers };
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

interface ResponseConfig {
  code: number;
  msg: string;
  data: string;
}
/**
 * 响应拦截
 */
// Add a request interceptor
request.interceptors.response.use(
  (response: AxiosResponse<ResponseConfig>) => {
    // Do something before request is sent
    // if (response.data.code === 200) {
    //   return response;
    // }

    // if (response.data && response.data.code !== 200) {
    //   Message.error(response.data.msg);
    // }

    if (response.data.code !== 200) {
      Message.error(response.data.msg);
    }
    // console.log('响应', response);

    return response.data;
    // return Promise.reject(response);
  },
  (error) => {
    Message.error(error.response.data.msg);
    // ! 当前路由不在login时不弹 401 error，避免连续两个接口都 401 时弹两次
    if (error.response.data.code === 401 && router.currentRoute.name !== 'Login') {
      Message.error(error.response.data.msg);
      UserModule.deltoken();
      watermark.remove();
      router.push(`/login?redirect=${location.href.split('#')[1]}`);
      // router.push({ path: '/login' });
    }
    // Do something with request error
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
