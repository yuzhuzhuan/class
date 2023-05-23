/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func?: Function, wait?: number, immediate?: boolean) {
  let timeout = 0 as any;
  const args = [] as any;
  let context = '' as any;
  let timestamp = '' as any;
  let result = '' as any;
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait! && last > 0) {
      timeout = setTimeout(later, wait! - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func!.apply(context, args);
        if (!timeout) context = args || null;
      }
    }
  };
  return function (this: any, ...arg: any) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func!.apply(context, arg);
      context = arg || null;
    }

    return result;
  };
}

/**
 * 通过地址来下载文件
 * @param downUrl
 * @param fileName
 */
export function downLoadByURL(downUrl: string, fileName = '文件名称') {
  const a = document.createElement('a'); // 创建a标签
  if ('download' in a) {
    a.download = fileName; // 设置下载文件的文件名
  }
  (document.body || document.documentElement).appendChild(a);
  a.href = downUrl; // downUrl为后台返回的下载地址
  a.target = '_parent';
  a.click(); // 设置点击事件
  a.remove(); // 移除a标签
}
