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
let newlist = projectList.list.concat()
let total = 0 as number

export default [
  {
    url: '/Api/user/list',
    type: 'get',
    response: (res: Response) => {
      total = list.length
      for (let i = 0; i < res.body.pageSize; i++) {
        newlist[i] = list[i]
      }
      if (res.body.pageIndex !== 1) {
        for (let i = 0; i < res.body.pageSize; i++) {
          const arr = list.slice(res.body.pageSize * res.body.pageIndex - res.body.pageSize)
          newlist[i] = arr[i]
        }
      }
      if (res.body.pageSize < newlist.length) {
        newlist.splice(res.body.pageSize)
      }

      if (res.body.name) {
        newlist = list.filter((item: any) => item.name === res.body.name)
        total = newlist.length
      }

      newlist = newlist.filter(Boolean)
      list = list.filter(Boolean)
      return {
        code: 200,
        message: '操作成功',
        list: newlist,
        total: total
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
