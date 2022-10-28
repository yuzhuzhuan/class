import Mock from 'mockjs'
import { Response } from './dataType'
const projectList = Mock.mock({
  'list|100': [{
    name: '@cname', // 中文名
    idCard: '@integer(1000000000000000000)', // 身份证
    email: '@email()', // 邮箱
    gender: '@integer(0, 1)', // 性别
    address: '@city(true)', // 地址
    createTime: '@datetime("yyyy-MM-dd  HH:mm")', // 创建时间
    phone: /1[3-9][0-9]{9}/, // 正则模式
    id: '@guid' // guid
  }]
})
let list = projectList.list.concat()
// let newlist = projectList.list.concat()
// let total = 0 as number
const depList = [
  {
    id: '1',
    name: '华南分部',
    children: [
      {
        id: '11',
        name: '研发部'
      },
      {
        id: '12',
        name: '财务部'
      },
      {
        id: '13',
        name: '商务部'
      },
      {
        id: '14',
        name: '市场部'
      }
    ]
  },
  {
    id: '2',
    name: '华北分部',
    children: [
      {
        id: '21',
        name: '研发部'
      },
      {
        id: '22',
        name: '财务部'
      },
      {
        id: '23',
        name: '商务部'
      },
      {
        id: '24',
        name: '市场部'
      }
    ]
  },
  {
    id: '3',
    name: '西北分部',
    children: [
      {
        id: '31',
        name: '研发部'
      },
      {
        id: '32',
        name: '财务部'
      },
      {
        id: '33',
        name: '商务部'
      },
      {
        id: '34',
        name: '市场部'
      }
    ]
  }
]

export default [
  {
    url: '/Api/department/list',
    type: 'get',
    response: (res: Response) => {
      console.log(res);
      console.log(depList);
      return {
        code: 200,
        message: '操作成功',
        list: list
      }
      // 使用return返回前端需要的数据
    }
  },
  {
    url: '/Api/user/delete',
    type: 'delete',
    response: (res: Response) => {
      console.log(res.body);

      list = list.filter((item: any) => item.id !== res.body.id)
      return {
        msg: '删除成功',
        code: 200
      }
    }
  },
  {
    url: '/Api/user/update',
    type: 'put',
    response: (res: Response) => {
      list = list.map((item: any) => item.id === res.body.id ? res.body : item)
      return {
        msg: '编辑用户成功',
        code: 200
      }
    }
  },
  {
    url: '/Api/Project/Add',
    type: 'post',
    response: (res: Response) => {
      console.log(res.body);
      list.push(res.body)
      return {
        msg: '新增用户成功',
        code: 200
      }
    }
  }
]
