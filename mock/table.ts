const MOCKTABLE = require('mockjs');

const sortList = MOCKTABLE.mock({
  'list|10': [
    {
      name: '@cname', // 中文名
      idCard: '@integer(1000000000000000000)', // 身份证
      email: '@email()', // 邮箱
      gender: '@integer(0, 1)', // 性别
      address: '@city(true)', // 地址
      createTime: '@datetime("yyyy-MM-dd  HH:mm")', // 创建时间
      phone: /1[3-9][0-9]{9}/, // 正则模式
      id: '@guid', // guid,
      'sort|+1': 1,
    },
  ],
});
let tablelist = sortList.list.concat();
let newtablelist = sortList.list.concat();

module.exports = [
  {
    url: '/url/project/list',
    type: 'get',
    response: (res) => {
      for (let i = 0; i < res.body.pageSize; i++) {
        newtablelist[i] = tablelist[i];
      }
      if (res.body.pageIndex !== 1) {
        newtablelist = tablelist.slice(res.body.pageSize * res.body.pageIndex - res.body.pageSize);
      }
      // 根据name查询数据返回
      if (res.body.name) {
        newtablelist = tablelist.filter((item) => item.name === res.body.name);
      }
      if (res.body.name && res.body.pageIndex !== 1) {
        newtablelist = newtablelist.slice(
          res.body.pageSize * res.body.pageIndex - res.body.pageSize,
        );
      }
      if (res.body.pageSize < newtablelist.length) {
        newtablelist.splice(res.body.pageSize);
      }

      newtablelist = newtablelist.filter(Boolean);
      tablelist = tablelist.filter(Boolean);
      return {
        code: 200,
        message: '操作成功',
        data: newtablelist,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/url/project/sort',
    type: 'post',
    response: (res) => {
      tablelist.push(res.body);
      return {
        msg: '操作成功',
        code: 200,
      };
    },
  },
];
