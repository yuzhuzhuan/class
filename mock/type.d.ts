/**
 * 用户接口数据
 */
export interface Data {
  // 页数
  pageSize: number;
  // 第几页
  pageIndex: number;
  name: string;
  username: string;
  password: string;
  id: number | string;
  pid: number;
  FormData: FormData;
}
export interface Response {
  // 页数
  body: Data;
}

// list数据
export interface ProjectList {
  list: List;
  token: string;
}
export interface List {
  name: string;
  idCard: string;
  email: string;
  gender: number;
  address: string;
  createTime: string;
  phone: string;
  id: string;
}

/**
 * mock接口
 */
// export interface Responds {
//     code: number;
//     message: string;
//     list: string;
//     total: number;
//     url: string;
//     type: string;
//   }

// export type Person = {
//     greet: (res: string) => {
//     code: number;
//     message: string;
//     total: number;
// };
// method: string;
// body: string;
// query: string;
// }

// export type IPerson =((res: any) => {
// code: number;
// message: string;
// total: number;
// list: any;
// }) | ((res: any) => {
//     msg: string;
//     code: number;
// })
export type IPerson = (res: any) => void;

/**
 * mock接口
 */
export interface Options {
  type: string;
  url: string;
  body: string;
}
