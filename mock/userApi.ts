import Mock from 'mockjs';
import { Response } from './type';

const userList = Mock.mock({
  'list|3': [
    {
      nickName: '@cname',
      phone: /1[3-9][0-9]{9}/,
      gender: '@integer(0, 1)',
      sysRoleId: 1,
      sysRoleName: 'admin',
    },
  ],
  'data|50': [
    {
      username: '@string("number", 1, 3) @string("upper", 1, 3)',
      name: '@cname',
      usertype: '@integer(0, 1)',
      enable: '@integer(0, 1)',
    },
  ],
});
let list = userList.list.concat();
let data = userList.data.concat();
let newlist = userList.data.concat();
let total = 0 as number;
for (let i = 0; i < list.length; i++) {
  list[i].id = i + 1;
}
for (let i = 0; i < data.length; i++) {
  data[i].id = i + 1;
}
export default [
  {
    url: '/api/user/list',
    type: 'get',
    response: (res: any) => {
      total = data.length;
      for (let i = 0; i < res.query.pageSize; i++) {
        newlist[i] = data[i];
      }
      if (res.query.page !== 1) {
        newlist = data.slice(res.query.pageSize * res.query.page - res.query.pageSize);
      }
      // 根据name查询数据返回
      if (res.query.name) {
        newlist = data.filter((item: any) => item.name === res.query.name);
        total = newlist.length;
      }
      if (res.query.name && res.query.page !== 1) {
        newlist = newlist.slice(res.query.pageSize * res.query.page - res.query.pageSize);
      }
      if (res.query.pageSize < newlist.length) {
        newlist.splice(res.query.pageSize);
      }

      newlist = newlist.filter(Boolean);
      data = data.filter(Boolean);
      return {
        data: newlist,
        total,
        code: 200,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/api/user/delete',
    type: 'delete',
    response: (res: any) => {
      data = data.filter((item: any) => item.id !== +res.query.id);
      return {
        msg: '删除成功',
        code: 200,
      };
    },
  },
  {
    url: '/api/user/update',
    type: 'put',
    response: (res: any) => {
      data = data.map((item: any) => (item.id === res.body.params.id ? res.body.params : item));
      return {
        msg: '编辑用户成功',
        code: 200,
      };
    },
  },
  {
    url: '/api/user/create',
    type: 'post',
    response: (res: any) => {
      res.body.params.id = data.length + 1;
      data.push(res.body.params);
      return {
        msg: '新增用户成功',
        code: 200,
      };
    },
  },
  {
    url: '/api/user/detail',
    type: 'get',
    response: (res: any) => {
      let obj: Partial<UserItem> = {};
      data.forEach((item: any) => {
        if (item.id === +res.query.id) {
          obj = item;
          obj.password = Mock.mock('@string("number", 1, 3) @string("upper", 1, 3)');
        }
      });
      return {
        msg: '查询用户成功',
        code: 200,
        data: obj,
      };
    },
  },
  {
    url: '/Api/user/list',
    type: 'get',
    response: (res: any) => {
      if (res.body.id) {
        list = list.filter((item: any) => item.id === +res.body.id);
      }

      total = list.length;
      return {
        code: 200,
        message: '操作成功',
        list,
        total,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/Api/user/detail',
    type: 'get',
    response: (res: any) => {
      let newdata;
      if (res.body.id) {
        newdata = list.filter((item: any) => item.id === +res.body.id);
      }
      return {
        code: 200,
        message: '操作成功',
        list: newdata,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/Api/user/delete',
    type: 'delete',
    response: (res: Response) => {
      list = list.filter((item: any) => item.id !== res.body.id);
      return {
        msg: '删除成功',
        code: 200,
      };
    },
  },
  {
    url: '/Api/user/update',
    type: 'put',
    response: (res: any) => {
      list = list.map((item: any) => (item.id === res.body.id ? res.body : item));
      return {
        msg: '编辑用户成功',
        code: 200,
      };
    },
  },
  {
    url: '/Api/user/Add',
    type: 'post',
    response: (res: any) => {
      res.body.id = list.length + 1;
      list.push(res.body);
      return {
        msg: '新增用户成功',
        code: 200,
      };
    },
  },
];
