/**
 * 用户登录接口数据
 */
export interface LoginData {
  // 用户名
  username: string;
  // 密码
  password: string;
}
export interface ParamsList {
  pageSize: number;
  pageIndex: number;
  name?: string;
}
export interface ParamsAdd {
  name: string;
  idCard: string;
  email: string;
  gender: number | string;
  address: string;
  createTime: string;
  phone: string;
  id: number | string;
}
export interface ParamsDel {
  id: number | string;
}

export interface UploadData {
  file: any;
}

export interface UserAdd {
  nickName: string;
  gender: number | string;
  sysRoleName: string;
  sysRoleId: number | string;
  phone: string;
  id: number | string;
  password?: string;
}
export interface UserList {
  pageSize?: number;
  pageIndex?: number;
  id?: string;
}
