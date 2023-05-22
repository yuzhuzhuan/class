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
      'id|+1': 1, // guid,
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
      // 根据name查询数据返回
      if (res.query.name || res.query.address) {
        if (res.query.name && !res.query.address) {
          newtablelist = tablelist.filter((item) => item.name === res.query.name);
        } else if (!res.query.name && res.query.address) {
          newtablelist = tablelist.filter((item) => item.address.includes(res.query.address));
        } else {
          newtablelist = tablelist.filter(
            (item) => item.address.includes(res.query.address) && item.name === res.query.name,
          );
        }
      } else {
        newtablelist = tablelist;
      }
      newtablelist = newtablelist.filter(Boolean);
      tablelist = tablelist.filter(Boolean);
      return {
        code: 200,
        msg: '操作成功',
        data: newtablelist,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/url/project/sort',
    type: 'post',
    response: (res) => {
      const curArr = res.body.map((item) => {
        return item.id;
      });
      tablelist.sort((a, b) => {
        return curArr.indexOf(a.id) - curArr.indexOf(b.id);
      });
      return {
        msg: '操作成功',
        data: '操作成功',
        code: 200,
      };
    },
  },
];
