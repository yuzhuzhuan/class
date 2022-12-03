import Mock from 'mockjs';
import { Response } from './type';
import { list as menuList } from './menuApi';
const projectList = Mock.mock({
  'object|8': {
    nickName: 'admin',
    phone: 13834582211,
    id: 1,
    sysRoleId: 1,
    sysRoleName: 'admin',
    menus: menuList
  },
  token: '@word(30)' // token
});

const token = {
  accessToken: projectList.token
};
export default [
  // 登录接口
  {
    url: '/Api/Project/login',
    type: 'post',
    response: (res: Response) => {
      if (res.body.username === 'admin' && res.body.password === '123456') {
        return {
          msg: '登录成功',
          code: 200,
          data: token
        };
      } else {
        return {
          msg: '用户名或密码错误',
          code: 500
        };
      }
    }
  },
  // 获取用户信息接口
  {
    url: '/Api/Project/user',
    type: 'get',
    response: (res: Response) => {
      if (res.body.username === 'admin' && res.body.password === '123456') {
        return {
          msg: '登录成功',
          code: 200,
          data: projectList.object
        };
      } else {
        return {
          msg: '用户名或密码错误',
          code: 500
        };
      }
    }
  }
];
