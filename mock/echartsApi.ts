import Mock from 'mockjs'
import { Response } from './type'


export default [
  {
    url: '/Api/echarts/columnChart',
    type: 'get',
    response: (res: Response) => {
      let columnChart = []
      columnChart = [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', Mock.mock('@integer(50, 120)'), Mock.mock('@integer(60, 200)'), Mock.mock('@integer(30, 80)')],
        ['Milk Tea', Mock.mock('@integer(30, 180)'), Mock.mock('@integer(30, 80)'), Mock.mock('@integer(50, 120)')],
        ['Cheese Cocoa', Mock.mock('@integer(30, 80)'), Mock.mock('@integer(50, 120)'), Mock.mock('@integer(20, 140)')],
        ['Walnut Brownie', Mock.mock('@integer(22, 130)'), Mock.mock('@integer(20, 140)'), Mock.mock('@integer(30, 180)')]
      ]
      return {
        code: 200,
        message: '操作成功',
        list: columnChart
      }
      // 使用return返回前端需要的数据
    }
  },
  {
    url: '/Api/echarts/lineChart',
    type: 'get',
    response: (res: Response) => {
      let lineChart = {
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          textStyle: {
            color: '#a1a1a1'
          }
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [Mock.mock('@integer(120, 450)'), Mock.mock('@integer(60, 150)'), Mock.mock('@integer(40, 150)'), Mock.mock('@integer(60, 150)'), Mock.mock('@integer(60, 150)'), Mock.mock('@integer(60, 260)'), Mock.mock('@integer(60, 285)')]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [Mock.mock('@integer(120, 450)'), Mock.mock('@integer(60, 260)'), Mock.mock('@integer(40, 190)'), Mock.mock('@integer(60, 280)'), Mock.mock('@integer(60, 350)'), Mock.mock('@integer(60, 460)'), Mock.mock('@integer(60, 385)')]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [Mock.mock('@integer(80, 220)'), Mock.mock('@integer(60, 260)'), Mock.mock('@integer(40, 220)'), Mock.mock('@integer(60, 180)'), Mock.mock('@integer(60, 240)'), Mock.mock('@integer(60, 360)'), Mock.mock('@integer(60, 355)')]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [Mock.mock('@integer(80, 420)'), Mock.mock('@integer(60, 360)'), Mock.mock('@integer(40, 320)'), Mock.mock('@integer(125, 380)'), Mock.mock('@integer(100, 340)'), Mock.mock('@integer(120, 360)'), Mock.mock('@integer(115, 385)')]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [Mock.mock('@integer(500, 880)'), Mock.mock('@integer(860, 960)'), Mock.mock('@integer(440, 1120)'), Mock.mock('@integer(825, 1280)'), Mock.mock('@integer(900, 1440)'), Mock.mock('@integer(820, 1360)'), Mock.mock('@integer(915, 1385)')]
          }
        ]
      }
      return {
        code: 200,
        message: '操作成功',
        list: lineChart
      }
      // 使用return返回前端需要的数据
    }
  },
  {
    url: '/Api/echarts/nestedChart',
    type: 'get',
    response: (res: Response) => {
      let nestedChart = []
      nestedChart =  [
        {
          name: 'Access From',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: [
            { value: Mock.mock('@integer(820, 1750)'), name: 'Search Engine' },
            { value: Mock.mock('@integer(720, 950)'), name: 'Direct' },
            { value: Mock.mock('@integer(520, 980)'), name: 'Marketing', selected: true }
          ]
        },
        {
          name: 'Access From',
          type: 'pie',
          radius: ['45%', '60%'],
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          data: [
            { value: Mock.mock('@integer(620, 1450)'), name: 'Baidu' },
            { value: Mock.mock('@integer(220, 450)'), name: 'Direct' },
            { value: Mock.mock('@integer(120, 390)'), name: 'Email' },
            { value: Mock.mock('@integer(70, 280)'), name: 'Google' },
            { value: Mock.mock('@integer(220, 320)'), name: 'Union Ads' },
            { value: Mock.mock('@integer(100, 145)'), name: 'Bing' },
            { value: Mock.mock('@integer(90, 150)'), name: 'Video Ads' },
            { value: Mock.mock('@integer(100, 190)'), name: 'Others' }
          ]
        }
      ]
    

      return {
        code: 200,
        message: '操作成功',
        list: nestedChart
      }
      // 使用return返回前端需要的数据
    }
  },
]