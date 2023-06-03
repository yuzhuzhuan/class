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
/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat: any) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  } as any;
  const time_str = format.replace(/{([ymdhisa])+}/g, (result: any, key: any) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}
