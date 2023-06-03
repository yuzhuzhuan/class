import request from '@/plugins/axios';

const service = {
  query() {
    return request.get('/department/list');
  },
  remove(params: any) {
    return request.delete('/department/delete', { params });
  },
  detail(params: any) {
    return request.get('/department/detail', { params });
  },
  update(data: any) {
    return request.put('/department/update', data);
  },
  create(data: any) {
    return request.post('/department/create', data);
  },
};

export default service;
