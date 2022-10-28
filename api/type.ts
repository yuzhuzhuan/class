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
  name: string;
}
export interface ParamsAdd {
    name: string;
    idCard: string;
    email: string;
    gender: any;
    address: string;
    createTime: string;
    phone: string;
    id: string;
}
export interface ParamsDel {
    id: string;
}

export interface UploadData {
 file: any;
}
