import Mock from 'mockjs' // 导入mockjs
import tableApi from './tableApi' // 导入我们模拟数据的js文件
import loginApi from './loginApi' // 导入我们模拟数据的js文件
import uploadApi from './uploadApi' // 导入我们模拟数据的js文件
import { Options, IPerson } from './type'
const mocks = [
  {
    intercept: true, // 你可能需要一个开关，来使模拟请求与真实请求并存
    fetchs: [...tableApi, ...loginApi, ...uploadApi]
  }]

// 抄来一个解析地址栏参数解析函数
export function param2Obj (url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
  )
}

// 关键！抄来一个前端模式构建函数（或者你也可以建一个mock server）
export const mockXHR = () => {
  Mock.XHR.prototype.proxySend = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxySend(...arguments)
  }

  function XHR2ExpressReqWrap (respond: IPerson) {
    return function (options: Options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    if (i.intercept) {
      for (const fetch of i.fetchs) {
        Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response))
      }
    }
  }
}
