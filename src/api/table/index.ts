import request from '@/utils/request';

const service = {
  query(params: any) {
    return request.get('/project/list', { params });
  },
  remove(params: any) {
    return request.delete('/project/delete', { params });
  },
  update(data: any) {
    return request.put('/project/update', data);
  },
  create(data: any) {
    return request.post('/project/create', data);
  },
};

export default service;
