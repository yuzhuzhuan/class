import request from '@/plugins/axios';

const service = {
  query(params: any) {
    return request.get('/project/list', { params });
  },
  updateSort(data: any) {
    return request.post('/project/sort', data);
  },
};

export default service;
