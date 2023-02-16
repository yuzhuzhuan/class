import Mock from 'mockjs';
import { Response } from './type';
import { list as menuList } from './menuApi';
let data = [
  {
    id: 1,
    name: 'admin',
    menus: menuList
  },
  {
    id: 2,
    name: 'aaa',
    menus: menuList
  },
  {
    id: 3,
    name: 'ccc',
    menus: menuList
  }
];

let total = 0 as number;

export default [
  {
    url: '/Api/role/list',
    type: 'get',
    response: (res: Response) => {
      total = data.length;
      return {
        code: 200,
        message: '操作成功',
        data,
        total: total
      };
    }
  },
  {
    url: '/Api/role/detail',
    type: 'get',
    response: (res: any) => {
      let obj = {} as any;
      data.forEach((item: any) => {
        if (item.id === +res.body) {
          obj = item;
        }
      });
      return {
        code: 200,
        message: '操作成功',
        data: obj
      };
    }
  },
  {
    url: '/Api/role/delete',
    type: 'delete',
    response: (res: Response) => {
      data = data.filter((item: any) => item.id !== res.body.id);
      return {
        msg: '删除成功',
        code: 200
      };
    }
  },
  {
    url: '/Api/role/update',
    type: 'put',
    response: (res: any) => {
      data = data.map((item: any) => (item.id === +res.body.id ? res.body : item));
      return {
        msg: '编辑角色成功',
        code: 200
      };
    }
  },
  {
    url: '/Api/role/add',
    type: 'post',
    response: (res: any) => {
      res.body.id = data.length + 1;
      data.push(res.body);
      return {
        msg: '新增角色成功',
        code: 200
      };
    }
  }
];
