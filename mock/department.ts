const MOCKTREE = require('mockjs');
// const { Message } = require('element-ui');

const depList = [
  {
    id: 1,
    departmentName: '华南分部',
    manager: MOCKTREE.mock('@cname'),
    introduce: MOCKTREE.mock('@ctitle'),
    pid: 0,
    email: MOCKTREE.mock('@email'),
    createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
    children: [
      {
        id: 11,
        departmentName: '研发部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 1,

        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 12,
        departmentName: '财务部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 1,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 13,
        departmentName: '商务部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 1,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 14,
        departmentName: '市场部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 1,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
    ],
  },
  {
    id: 2,
    departmentName: '华北分部',
    manager: MOCKTREE.mock('@cname'),
    introduce: MOCKTREE.mock('@ctitle'),
    pid: 0,
    email: MOCKTREE.mock('@email'),
    createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
    children: [
      {
        id: 21,
        departmentName: '研发部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 2,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 22,
        departmentName: '财务部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 2,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 23,
        departmentName: '商务部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 2,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 24,
        departmentName: '市场部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 2,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
    ],
  },
  {
    id: 3,
    departmentName: '西北分部',
    manager: MOCKTREE.mock('@cname'),
    introduce: MOCKTREE.mock('@ctitle'),
    pid: 0,
    email: MOCKTREE.mock('@email'),
    createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
    children: [
      {
        id: 31,
        departmentName: '研发部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 3,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 32,
        departmentName: '财务部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 3,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 33,
        departmentName: '商务部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 3,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
      {
        id: 34,
        departmentName: '市场部',
        manager: MOCKTREE.mock('@cname'),
        introduce: MOCKTREE.mock('@ctitle'),
        pid: 3,
        email: MOCKTREE.mock('@email'),
        createTime: MOCKTREE.mock('@date("yyyy-MM-dd")'),
      },
    ],
  },
];
let treelist = [...depList];
const removeNodeInTree = (treeList, id) => {
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
const appendNodeInTree = (pid, tree, obj) => {
  tree.forEach((ele) => {
    if (ele.id === pid) {
      ele.children ? ele.children.push(obj) : (ele.children = [obj]);
    } else if (ele.children) {
      appendNodeInTree(pid, ele.children, obj);
    }
  });
  return tree;
};
// 修改
const updateNodeInTree = (treeList, id, pid, obj) => {
  if (!treeList || !treeList.length) {
    return;
  }

  if (pid === 0 && id.toString().length === 2 && pid.toString().length === 2) {
    // Message.error('父级栏目不存在');
    return treeList;
  } else if (id.toString().length === 1) {
    // Message.error('无法修改节点的父级节点');
    return treeList;
  }

  for (let i = 0; i < treeList.length; i++) {
    if (+treeList[i].id === +id) {
      treeList[i] = obj;
      break;
    }
    setTreeListNodeFalse(treeList[i].children, id, pid, obj);
  }
  return treeList;
};
// 修改子级
const setTreeListNodeFalse = (treeList, id, pid, obj) => {
  if (!treeList || !treeList.length) {
    return;
  }

  for (let i = 0; i < treeList.length; i++) {
    if (+treeList[i].id === +id && +treeList[i].pid === +pid) {
      treeList[i] = obj;
    } else if (+treeList[i].id === id && +treeList[i].pid !== +pid) {
      treeList.splice(i, 1);
      return treeList;
    } else if (+treeList[i].pid === +pid && !treeList[i].id.toString().includes(pid.toString())) {
      treeList.push(obj);
      return treeList;
    }
  }
  return treeList;
};
module.exports = [
  {
    url: '/url/department/list',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: '操作成功',
        data: treelist,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/url/department/create',
    type: 'post',
    response: (res) => {
      if (res.body.params.pid) {
        treelist = appendNodeInTree(res.body.pid, treelist, res.body);
      } else {
        treelist.push(res.body.params);
      }
      return {
        msg: '新增成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/department/delete',
    type: 'delete',
    response: (res) => {
      removeNodeInTree(treelist, +res.query.id);
      return {
        msg: '删除成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/department/update',
    type: 'put',
    response: (config) => {
      updateNodeInTree(treelist, config.body.id, config.body.pid, config.body);

      return {
        msg: '编辑成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/department/detail',
    type: 'get',
    response: (config) => {
      let obj = {};
      treelist.forEach((item) => {
        if (+item.id === +config.query.id) {
          obj = item;
        }
        if (item.children) {
          item.children.forEach((child) => {
            if (+child.id === +config.query.id) {
              obj = child;
            }
          });
        }
      });
      return {
        msg: '查询成功',
        code: 200,
        data: obj,
      };
    },
  },
];
