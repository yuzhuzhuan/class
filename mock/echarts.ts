const MOCKE = require('mockjs');
// import Mock from 'mockjs';
// import { Response } from './type';

module.exports = [
  {
    url: '/url/echarts/columnChart',
    type: 'get',
    response: (res) => {
      const columnChart = [
        ['product', '2015', '2016', '2017'],
        [
          'Matcha Latte',
          MOCKE.mock('@integer(50, 120)'),
          MOCKE.mock('@integer(60, 200)'),
          MOCKE.mock('@integer(30, 80)'),
        ],
        [
          'Milk Tea',
          MOCKE.mock('@integer(30, 180)'),
          MOCKE.mock('@integer(30, 80)'),
          MOCKE.mock('@integer(50, 120)'),
        ],
        [
          'Cheese Cocoa',
          MOCKE.mock('@integer(30, 80)'),
          MOCKE.mock('@integer(50, 120)'),
          MOCKE.mock('@integer(20, 140)'),
        ],
        [
          'Walnut Brownie',
          MOCKE.mock('@integer(22, 130)'),
          MOCKE.mock('@integer(20, 140)'),
          MOCKE.mock('@integer(30, 180)'),
        ],
      ];
      return {
        data: columnChart,
        msg: '操作成功',
        code: 200,
      };
      // return {
      //   code: 200,
      //   msg: '操作成功',
      //   data: columnChart,
      // };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/url/echarts/lineChart',
    type: 'get',
    response: (res) => {
      const lineChart = {
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          textStyle: {
            color: '#a1a1a1',
          },
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [
              MOCKE.mock('@integer(120, 450)'),
              MOCKE.mock('@integer(60, 150)'),
              MOCKE.mock('@integer(40, 150)'),
              MOCKE.mock('@integer(60, 150)'),
              MOCKE.mock('@integer(60, 150)'),
              MOCKE.mock('@integer(60, 260)'),
              MOCKE.mock('@integer(60, 285)'),
            ],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [
              MOCKE.mock('@integer(120, 450)'),
              MOCKE.mock('@integer(60, 260)'),
              MOCKE.mock('@integer(40, 190)'),
              MOCKE.mock('@integer(60, 280)'),
              MOCKE.mock('@integer(60, 350)'),
              MOCKE.mock('@integer(60, 460)'),
              MOCKE.mock('@integer(60, 385)'),
            ],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [
              MOCKE.mock('@integer(80, 220)'),
              MOCKE.mock('@integer(60, 260)'),
              MOCKE.mock('@integer(40, 220)'),
              MOCKE.mock('@integer(60, 180)'),
              MOCKE.mock('@integer(60, 240)'),
              MOCKE.mock('@integer(60, 360)'),
              MOCKE.mock('@integer(60, 355)'),
            ],
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [
              MOCKE.mock('@integer(80, 420)'),
              MOCKE.mock('@integer(60, 360)'),
              MOCKE.mock('@integer(40, 320)'),
              MOCKE.mock('@integer(125, 380)'),
              MOCKE.mock('@integer(100, 340)'),
              MOCKE.mock('@integer(120, 360)'),
              MOCKE.mock('@integer(115, 385)'),
            ],
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
            },
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: [
              MOCKE.mock('@integer(500, 880)'),
              MOCKE.mock('@integer(860, 960)'),
              MOCKE.mock('@integer(440, 1120)'),
              MOCKE.mock('@integer(825, 1280)'),
              MOCKE.mock('@integer(900, 1440)'),
              MOCKE.mock('@integer(820, 1360)'),
              MOCKE.mock('@integer(915, 1385)'),
            ],
          },
        ],
      };
      return {
        code: 200,
        msg: '操作成功',
        data: lineChart,
      };
      // 使用return返回前端需要的数据
    },
  },
  {
    url: '/url/echarts/nestedChart',
    type: 'get',
    response: (res) => {
      const nestedChart = [
        {
          name: 'Access From',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: MOCKE.mock('@integer(820, 1750)'), name: 'Search Engine' },
            { value: MOCKE.mock('@integer(720, 950)'), name: 'Direct' },
            { value: MOCKE.mock('@integer(520, 980)'), name: 'Marketing', selected: true },
          ],
        },
        {
          name: 'Access From',
          type: 'pie',
          radius: ['45%', '60%'],
          labelLine: {
            length: 30,
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#f6f8fC',
            borderColor: '#8c8d8e',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6e7079',
                lineHeight: 22,
                align: 'center',
              },
              hr: {
                borderColor: '#8c8d8e',
                width: '100%',
                borderWidth: 1,
                height: 0,
              },
              b: {
                color: '#4c5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33,
              },
              per: {
                color: '#fff',
                backgroundColor: '#4c5058',
                padding: [3, 4],
                borderRadius: 4,
              },
            },
          },
          data: [
            { value: MOCKE.mock('@integer(620, 1450)'), name: 'Baidu' },
            { value: MOCKE.mock('@integer(220, 450)'), name: 'Direct' },
            { value: MOCKE.mock('@integer(120, 390)'), name: 'Email' },
            { value: MOCKE.mock('@integer(70, 280)'), name: 'Google' },
            { value: MOCKE.mock('@integer(220, 320)'), name: 'Union Ads' },
            { value: MOCKE.mock('@integer(100, 145)'), name: 'Bing' },
            { value: MOCKE.mock('@integer(90, 150)'), name: 'Video Ads' },
            { value: MOCKE.mock('@integer(100, 190)'), name: 'Others' },
          ],
        },
      ];

      return {
        code: 200,
        msg: '操作成功',
        data: nestedChart,
      };
      // 使用return返回前端需要的数据
    },
  },
];
