import request from '@/utils/request';

const service = {
  query(params: any) {
    return request.get('/user/list', { params });
  },
  remove(params: any) {
    return request.delete('/user/delete', { params });
  },
  detail(params: any) {
    return request.get('/user/detail', { params });
  },
  update(data: any) {
    return request.put('/user/update', data);
  },
  create(data: any) {
    return request.post('/user/create', data);
  },
};

export default service;
