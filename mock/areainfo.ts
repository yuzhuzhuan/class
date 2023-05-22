const province = require('./cascade_province.json');
const city = require('./cascade_city.json');
const arae = require('./cascade_area.json');

let areaList;

module.exports = [
  {
    url: '/url/areainfo',
    type: 'get',
    response: (config) => {
      if (!config.query.id) {
        areaList = province;
      }
      if (config.query.id.length === 2) {
        areaList = city.filter((item) => item.pid === +config.query.id);
      }
      if (config.query.id.length === 4) {
        areaList = arae.filter((item) => item.pid === +config.query.id);
      }

      return {
        data: areaList,
        msg: '操作成功',
        code: 200,
      };
    },
  },
];
