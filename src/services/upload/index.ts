import request from '@/plugins/axios';

const service = {
  create(data: any) {
    return request.post('/upload', data);
  },
};

export default service;
