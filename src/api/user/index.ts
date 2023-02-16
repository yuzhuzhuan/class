import request from '@/utils/request';

const service = {
  query(params: any) {
    return request.post('/Api/user/list', params);
  },
  remove(params: any) {
    return request.post('/Api/Project/login', params);
  },
  detail(params: any) {
    return request.post('/Api/Project/login', params);
  },
  update(params: any) {
    return request.post('/Api/Project/login', params);
  },
  create(params: any) {
    return request.post('/Api/Project/login', params);
  }
};

export default service;
