import Mock from 'mockjs'
import { Response } from './type'
const projectList = Mock.mock({
  'object|8': {
    nickName: 'admin',
    phone: 13834582211,
    id: 1,
    sysRoleId: 1,
    sysRoleName: 'admin',
    'menus|10': [{
      id: '@guid',
      name: '@cword()',
      parentId: 3,
      path: '/cms/article',
      requestMethod: 'POST',
      rootId: 3
    }]
  },
  token: '@word(30)' // token
})

export default [
  // 登录接口
  {
    url: '/Api/Project/upload',
    type: 'post',
    response: (res: Response) => {
      console.log(res);
      // if (res.body.username === 'admin' && res.body.password === '123456') {
      //   return {
      //     msg: '登录成功',
      //     code: 200,
      //     data: token
      //   }
      // } else {
      //   return {
      //     msg: '用户名或密码错误',
      //     code: 500
      //   }
      // }
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
        }
      } else {
        return {
          msg: '用户名或密码错误',
          code: 500
        }
      }
    }
  }
]
