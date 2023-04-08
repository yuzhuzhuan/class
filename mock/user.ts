const MOCK = require('mockjs');

const userList = MOCK.mock({
  'list|3': [
    {
      nickName: '@cname',
      phone: /1[3-9][0-9]{9}/,
      gender: '@integer(0, 1)',
      sysRoleId: 1,
      sysRoleName: 'admin',
      'id|+1': 1,
    },
  ],
  'data|50': [
    {
      username: '@string("number", 1, 3) @string("upper", 1, 3)',
      name: '@cname',
      usertype: '@integer(0, 1)',
      password: '@string("number", 1, 3) @string("upper", 1, 3)',
      enable: '@integer(0, 1)',
      'id|+1': 1,
    },
  ],
});
const list = userList.list.concat();
let data = userList.data.concat();
let newlist = userList.data.concat();
let total = 0;
// for (let i = 0; i < list.length; i++) {
//   list[i].id = i + 1;
// }
// for (let i = 0; i < data.length; i++) {
//   data[i].id = i + 1;
// }

module.exports = [
  {
    url: '/url/user/list',
    method: 'get',
    response: (config) => {
      total = data.length;
      for (let i = 0; i < config.query.pageSize; i++) {
        newlist[i] = data[i];
      }
      if (config.query.pageNum !== 1) {
        newlist = data.slice(config.query.pageSize * config.query.pageNum - config.query.pageSize);
      }
      // 根据name查询数据返回
      if (config.query.name) {
        newlist = data.filter((item) => item.name === config.query.name);
        total = newlist.length;
      }
      if (config.query.name && config.query.pageNum !== 1) {
        newlist = newlist.slice(
          config.query.pageSize * config.query.pageNum - config.query.pageSize,
        );
      }
      if (config.query.pageSize < newlist.length) {
        newlist.splice(config.query.pageSize);
      }

      newlist = newlist.filter(Boolean);
      data = data.filter(Boolean);
      return {
        data: newlist,
        total,
        code: 200,
      };
    },
  },
  {
    url: '/url/user/detail',
    type: 'get',
    response: (config) => {
      let newdata;
      if (config.query.id) {
        newdata = data.filter((item) => item.id === +config.query.id);
      }
      return {
        code: 200,
        msg: '操作成功',
        data: newdata[0],
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/url/user/delete',
    type: 'delete',
    response: (config) => {
      data = data.filter((item) => item.id !== +config.query.id);
      return {
        msg: '删除成功',
        data: '操作成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/user/update',
    type: 'put',
    response: (config) => {
      data = data.map((item) => (item.id === +config.body.id ? config.body : item));
      return {
        msg: '编辑用户成功',
        code: 200,
      };
    },
  },
  {
    url: '/url/user/create',
    type: 'post',
    response: (config) => {
      const item = config.body;
      item.id = total++;
      data.push(item);
      return {
        msg: '新增用户成功',
        code: 200,
      };
    },
  },
];
