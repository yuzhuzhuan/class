import { Response } from './type';
export let list = [
  {
    id: 1,
    name: '文章管理',
    parentId: 0,
    rootId: 0
  },
  {
    id: 11,
    name: '添加文章',
    parentId: 1,
    rootId: 1
  },
  {
    id: 12,
    name: '更新文章',
    parentId: 1,
    rootId: 1
  },
  {
    id: 13,
    name: '删除文章',
    parentId: 1,
    rootId: 1
  },
  {
    id: 14,
    name: '获取文章信息',
    parentId: 1,
    rootId: 1
  },
  {
    id: 15,
    name: '文章分页查询',
    parentId: 1,
    rootId: 1
  },
  {
    id: 2,
    name: '栏目管理',
    parentId: 0,
    rootId: 0
  },
  {
    id: 21,
    name: '添加栏目',
    parentId: 2,
    rootId: 2
  },
  {
    id: 22,
    name: '更新栏目',
    parentId: 2,
    rootId: 2
  },
  {
    id: 23,
    name: '删除栏目',
    parentId: 2,
    rootId: 2
  },
  {
    id: 24,
    name: '获取栏目信息',
    parentId: 2,
    rootId: 2
  },
  {
    id: 3,
    name: '文件管理',
    parentId: 0,
    rootId: 0
  },
  {
    id: 31,
    name: '添加文件',
    parentId: 3,
    rootId: 3
  },
  {
    id: 32,
    name: '更新文件',
    parentId: 3,
    rootId: 3
  },
  {
    id: 33,
    name: '删除文件',
    parentId: 3,
    rootId: 3
  },
  {
    id: 34,
    name: '获取文件列表',
    parentId: 3,
    rootId: 3
  },
  {
    id: 4,
    name: '模板文件管理',
    parentId: 0,
    rootId: 0
  },
  {
    id: 41,
    name: '添加模板',
    parentId: 4,
    rootId: 4
  },
  {
    id: 42,
    name: '更新模板',
    parentId: 4,
    rootId: 4
  },
  {
    id: 43,
    name: '删除模板',
    parentId: 4,
    rootId: 4
  },
  {
    id: 44,
    name: '获取模板列表',
    parentId: 4,
    rootId: 4
  },
  {
    id: 5,
    name: '角色文件管理',
    parentId: 0,
    rootId: 0
  },
  {
    id: 51,
    name: '添加角色',
    parentId: 5,
    rootId: 5
  },
  {
    id: 52,
    name: '更新角色',
    parentId: 5,
    rootId: 5
  },
  {
    id: 53,
    name: '删除角色',
    parentId: 5,
    rootId: 5
  },
  {
    id: 54,
    name: '获取角色列表',
    parentId: 5,
    rootId: 5
  },
  {
    id: 55,
    name: '获取角色信息',
    parentId: 5,
    rootId: 5
  },
  {
    id: 6,
    name: '用户管理',
    parentId: 0,
    rootId: 0
  },
  {
    id: 61,
    name: '添加用户',
    parentId: 6,
    rootId: 6
  },
  {
    id: 62,
    name: '更新用户',
    parentId: 6,
    rootId: 6
  },
  {
    id: 63,
    name: '删除用户',
    parentId: 6,
    rootId: 6
  },
  {
    id: 64,
    name: '获取用户列表',
    parentId: 6,
    rootId: 6
  },
  {
    id: 65,
    name: '获取用户信息',
    parentId: 6,
    rootId: 6
  }
];
let total = 0 as number;

export default [
  {
    url: '/Api/menu/list',
    type: 'get',
    response: (res: Response) => {
      total = list.length;
      return {
        code: 200,
        message: '操作成功',
        data: list,
        total: total
      };
    }
  }
];
