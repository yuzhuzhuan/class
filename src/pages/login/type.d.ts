import { UserData } from '@/views/types/dataTypes';
import { AxiosResponse } from 'axios';

/**
 * 登录数据的接口
 */
export interface LoginForm {
  username: string;
  password: string;
}

/**
 * 登录返回的结果
 */
export interface LoginRes extends AxiosResponse {
  token: string;
  data: UserData;
}
