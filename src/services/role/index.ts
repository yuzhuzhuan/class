import request from '@/plugins/axios';

const service = {
  query(params: any) {
    return request.get('/role/list', { params });
  },
  remove(params: any) {
    return request.delete('/role/delete', { params });
  },
  detail(params: any) {
    return request.get('/role/detail', { params });
  },
  update(data: any) {
    return request.put('/role/update', data);
  },
  create(data: any) {
    return request.post('/role/create', data);
  },
  queryMenu() {
    return request.get('/menu/list');
  },
};

export default service;
