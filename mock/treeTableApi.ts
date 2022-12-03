import Mock from 'mockjs';
import { Response } from './type';
import { Message } from 'element-ui';
const depList = [
  {
    id: 1,
    departmentName: '华南分部',
    manager: Mock.mock('@cname'),
    introduce: Mock.mock('@ctitle'),
    pid: 0,
    email: Mock.mock('@email'),
    createTime: Mock.mock('@date("yyyy-MM-dd")'),
    children: [
      {
        id: 11,
        departmentName: '研发部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 1,

        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 12,
        departmentName: '财务部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 1,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 13,
        departmentName: '商务部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 1,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 14,
        departmentName: '市场部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 1,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      }
    ]
  },
  {
    id: 2,
    departmentName: '华北分部',
    manager: Mock.mock('@cname'),
    introduce: Mock.mock('@ctitle'),
    pid: 0,
    email: Mock.mock('@email'),
    createTime: Mock.mock('@date("yyyy-MM-dd")'),
    children: [
      {
        id: 21,
        departmentName: '研发部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 2,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 22,
        departmentName: '财务部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 2,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 23,
        departmentName: '商务部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 2,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 24,
        departmentName: '市场部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 2,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      }
    ]
  },
  {
    id: 3,
    departmentName: '西北分部',
    manager: Mock.mock('@cname'),
    introduce: Mock.mock('@ctitle'),
    pid: 0,
    email: Mock.mock('@email'),
    createTime: Mock.mock('@date("yyyy-MM-dd")'),
    children: [
      {
        id: 31,
        departmentName: '研发部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 3,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 32,
        departmentName: '财务部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 3,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 33,
        departmentName: '商务部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 3,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      },
      {
        id: 34,
        departmentName: '市场部',
        manager: Mock.mock('@cname'),
        introduce: Mock.mock('@ctitle'),
        pid: 3,
        email: Mock.mock('@email'),
        createTime: Mock.mock('@date("yyyy-MM-dd")')
      }
    ]
  }
];
let list = [...depList];

export default [
  {
    url: '/api/department/list',
    type: 'get',
    response: (res: Response) => {
      return {
        code: 200,
        message: '操作成功',
        data: list
      };
      // 使用return返回前端需要的数据
    }
  },
  {
    url: '/api/department/create',
    type: 'post',
    response: (res: any) => {
      if (res.body.params.pid) {
        list = appendNodeInTree(res.body.params.pid, list, res.body.params);
      } else {
        list.push(res.body.params);
      }
      return {
        msg: '新增成功',
        code: 200
      };
    }
  },
  {
    url: '/api/department/delete',
    type: 'delete',
    response: (res: any) => {
      removeNodeInTree(list, +res.query.id);
      return {
        msg: '删除成功',
        code: 200
      };
    }
  },
  {
    url: '/api/department/update',
    type: 'put',
    response: (res: any) => {
      updateNodeInTree(list, res.body.params.id, res.body.params.pid, res.body.params);

      return {
        msg: '编辑成功',
        code: 200
      };
    }
  },
  {
    url: '/api/department/detail',
    type: 'get',
    response: (res: any) => {
      let obj = {};
      list.forEach((item: any) => {
        if (+item.id === +res.query.id) {
          obj = item;
        }
        if (item.children) {
          item.children.forEach((child: any) => {
            if (+child.id === +res.query.id) {
              obj = child;
            }
          });
        }
      });
      return {
        msg: '查询成功',
        code: 200,
        data: obj
      };
    }
  },
  {
    url: '/Api/department/list',
    type: 'get',
    response: (res: Response) => {
      return {
        code: 200,
        message: '操作成功',
        data: list
      };
      // 使用return返回前端需要的数据
    }
  },
  {
    url: '/Api/department/delete',
    type: 'delete',
    response: (res: Response) => {
      removeNodeInTree(list, res.body.id);
      // return {
      //   msg: '删除成功',
      //   code: 200
      // };
    }
  },
  {
    url: '/Api/department/update',
    type: 'put',
    response: (res: any) => {
      // list = list.map((item: any) => item.id === res.body.id ? res.body : item)
      updateNodeInTree(list, res.body.id, res.body.pid, res.body);
      return {
        msg: '编辑用户成功',
        code: 200
      };
    }
  },
  {
    url: '/Api/department/add',
    type: 'post',
    response: (res: any) => {
      if (res.body.pid) {
        list = appendNodeInTree(res.body.pid, list, res.body);
      } else {
        list.push(res.body);
      }
      return {
        msg: '新增用户成功',
        code: 200
      };
    }
  }
];
// 移除
const removeNodeInTree = (treeList: any, id: any) => {
  // 通过id从数组（树结构）中移除元素
  if (!treeList || !treeList.length) {
    return;
  }
  for (let i = 0; i < treeList.length; i++) {
    if (treeList[i].id === id) {
      treeList.splice(i, 1);
      return treeList;
    }
    removeNodeInTree(treeList[i].children, id);
  }
};
// 添加
const appendNodeInTree = (pid: any, tree: any, obj: any) => {
  tree.forEach((ele: any) => {
    if (ele.id === pid) {
      ele.children ? ele.children.push(obj) : (ele.children = [obj]);
    } else {
      if (ele.children) {
        appendNodeInTree(pid, ele.children, obj);
      }
    }
  });
  return tree;
};
// 修改
const updateNodeInTree = (treeList: any, id: any, pid: any, obj: any) => {
  if (!treeList || !treeList.length) {
    return;
  }

  if (pid == 0 && id.toString().length == 2 && pid.toString().length == 2) {
    Message.error('父级栏目不存在');
    return treeList;
  } else if (id.toString().length == 1) {
    Message.error('无法修改节点的父级节点');
    return treeList;
  }

  for (let i = 0; i < treeList.length; i++) {
    if (+treeList[i].id == +id) {
      treeList[i] = obj;
      break;
    }
    setTreeListNodeFalse(treeList[i].children, id, pid, obj);
  }
  return treeList;
};
// 修改子级
const setTreeListNodeFalse = (treeList: any, id: any, pid: any, obj: any) => {
  if (!treeList || !treeList.length) {
    return;
  }

  for (let i = 0; i < treeList.length; i++) {
    if (+treeList[i].id == +id && +treeList[i].pid == +pid) {
      treeList[i] = obj;
    } else if (+treeList[i].id == id && +treeList[i].pid !== +pid) {
      treeList.splice(i, 1);
      return treeList;
    } else if (+treeList[i].pid == +pid && !treeList[i].id.toString().includes(pid.toString())) {
      treeList.push(obj);
      return treeList;
    }
  }
  return treeList;
};
