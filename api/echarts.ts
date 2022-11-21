import request from './_request';

// ColumnChart
export function getColumnChartApi () {
  return request({
    url: '/Api/echarts/columnChart',
    method: 'get'
  });
}
// LineChart
export function getLineChartApi () {
  return request({
    url: '/Api/echarts/lineChart',
    method: 'get'
  });
}
// NestedChart
export function getNestedChartApi () {
  return request({
    url: '/Api/echarts/nestedChart',
    method: 'get'
  });
}
