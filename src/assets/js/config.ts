/**
 * 项目配置参数
 */

// import * as Api from './api'

// pageTile
export const PAGE_TITLE = '智居';

export const IS_PRO = process.env.NODE_ENV === 'production';

// pageTile
export const BASE_URL =
  process.env.BASE_URL ||
  (globalThis?.location && `${globalThis.location.protocol}//${globalThis.location.hostname}:${globalThis.location.port}/api`);

// 表格翻页默认值
export const DEF_PAGE_INFO = {
  pageSizes: [10, 20, 40, 60, 80, 100],
  pageIndex: 1,
  pageSize: 10,
  'show-total': true,
  'show-elevator': true,
  'show-sizer': true,
  'prev-text': '上一页',
  'next-text': '下一页'
};

// 上传文件默认配置
export const DEF_UPLOAD = {
  // 默认上传路径
  action: '/upload/file',
  // 默认大小: 8G
  size: 800 * 1024 * 10,
  // 文件字段
  name: 'file'
};

// 免登录白名单
export const WHITE_ROUTES = ['/login'];

// token 失效时间: 30 mins
export const TOKEN_TIMEOUT = 30 * 60 * 1000;

export enum RESPONSE_CONFIG {
  OK = 200,
  FAIL = 500,
  TIMEOUT = 5000,
  MESSAGE = 'msg',
  CODE = 'code',
  DATA = 'data',
  TOKEN = 'Authorization',
  LANG = 'Accept-Language'
}

// 联调接口代理前缀
export const API_PROXY = [
  {
    prefix: '/gzq',
    // prefix: '/ybTest',
    apis: [
      /^\/device/, //
      /^\/scene/,
      /^\/area/,
      /^\/system/,
      /^\/config/,
      /^\/interface/,
      /^\$EDC/,
      /^yeker/,
      /^\/panel/
    ] as RegExp[]
  }
];
