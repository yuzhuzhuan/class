import request from '@/utils/request';

const service = {
  create(data: any) {
    return request.post('/upload', data);
  },
};

export default service;
