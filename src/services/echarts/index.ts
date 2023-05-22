import request from '@/utils/request';

const service = {
  columnChart() {
    return request.get('/echarts/columnChart');
  },
  lineChart() {
    return request.get('/echarts/lineChart');
  },
  nestedChart() {
    return request.get('/echarts/nestedChart');
  },
};

export default service;
